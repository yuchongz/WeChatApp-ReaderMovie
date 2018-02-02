var post_content = require('../../../data/posts_data.js');
var globalData = getApp();

Page({
  data: {
    postData: {},
    isPlayingMusic: false
  },
  /* 可以在 onLoad 中获取打开当前页面所调用的 query 参数，query参数以名值对的方式作为函数参数传递给onLoad函数 */
  onLoad: function (query) {    // 参数可任意命名，不一定是query
    var id = query.postId;    // query是对象，可以通过访问对象属性的方式获取query参数的值
    if (globalData.isPlayingMusic && globalData.musicPostId === id) {
      this.setData({
        isPlayingMusic: true
      });
    }
    var postData = post_content[id];   // 获取当前页面数据
    var collected = wx.getStorageSync(id);  // 从缓存中获取当前页面是否被收藏，collected为true代表已被收藏
    /* 如果能从缓存中取到collected值即把这个值放在data对象中 */
    if (collected) {
      this.setData({
        collected: collected
      });
    }
    /* 如果缓存中没有当前页面的信息，则往缓存中记录当前页面未被收藏，即collected为false，
    并往data对象中添加collected属性 */
    else {
      wx.setStorageSync(id, false);
      this.setData({
        collected: false
      });
    }
    /* 把文章其他数据及文章id存到data对象中 */
    this.setData({
      postData: postData,
      id: id
    });
  },
  /* 点击收藏（或未收藏）图标时调用的事件处理函数 */
  collect: function () {
    var id = this.data.id;    // 获取当前文章的id
    var if_collected = wx.getStorageSync(id);  // 从缓存中获取当前文章的收藏情况
    /* 能拿到收藏情况才更新缓存和data对象 */
    wx.setStorageSync(id, !if_collected);
    this.setData({
      collected: !if_collected
    });
    wx.showToast({
      title: !if_collected ? "收藏成功" : "取消成功",
      duration: 1000
    })
  },
  /* 点击转发按钮调用的函数，可实现分享功能 */
  onShareAppMessage: function (res) {
    return {
      title: this.data.postData.title,
      imageUrl: this.data.postData.imgSrc
    }
  },
  musicPlay: function () {
    var music = this.data.postData.music;
    var _this = this;
    var musicPlay = this.data.isPlayingMusic;
    if (musicPlay) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: !musicPlay
      });
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg,
        success: function () {
          _this.setData({
            isPlayingMusic: !musicPlay
          });
        }
      });
    }
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        isPlayingMusic: true
      });
      globalData.isPlayingMusic = true;
      globalData.musicPostId = _this.data.id;
    });
    wx.onBackgroundAudioStop(function () {
      _this.setData({
        isPlayingMusic: false
      });
      globalData.isPlayingMusic = false;
      globalData.musicPostId = null;
    });
    wx.onBackgroundAudioPause(function () {
      _this.setData({
        isPlayingMusic: false
      });
      globalData.isPlayingMusic = false;
      globalData.musicPostId = null;
    });
  }
})