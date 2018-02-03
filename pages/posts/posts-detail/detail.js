var post_content = require('../../../data/posts_data.js');
var app = getApp();  // 取得全局app实例

Page({
  data: {
    postData: {},
    isPlayingMusic: false
  },
  /* 可以在 onLoad 中获取打开当前页面所调用的 query 参数，query参数以名值对的方式作为函数参数传递给onLoad函数 */
  onLoad: function (query) {    // 参数可任意命名，不一定是query
    var _this = this;
    var id = query.postId;    // query是对象，可以通过访问对象属性的方式获取query参数的值
    if (app.globalData.isPlayingMusic && app.globalData.musicPostId === id) {
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
    this.bindMusicEvent();  // 绑定有关音乐播放器的事件处理函数
  },
  bindMusicEvent: function () {
    var _this = this;
    /* 音乐从停止或者暂停状态到播放状态时触发的事件处理函数 */
    wx.onBackgroundAudioPlay(function () {
      /* 只有页面id和全局数据的musicPostId一致并且音乐没有在播放才会执行方法体 */
      if (!(app.globalData.isPlayingMusic) && app.globalData.musicPostId === _this.data.id) {
        _this.setData({
          isPlayingMusic: true
        });
        app.globalData.isPlayingMusic = true;
        // app.globalData.musicPostId = _this.data.id;
      }
    });
    /* 音乐从暂停或者播放状态到停止状态时触发的事件处理函数 */
    wx.onBackgroundAudioStop(function () {
      _this.setData({
        isPlayingMusic: false
      });
      app.globalData.isPlayingMusic = false;
      app.globalData.musicPostId = null;
    });
    /* 音乐从播放状态到暂停状态时触发的事件处理函数 */
    wx.onBackgroundAudioPause(function () {
      /* 只有页面id和全局数据的musicPostId一致并且音乐在播放才会执行方法体 */
      if (app.globalData.isPlayingMusic && app.globalData.musicPostId === _this.data.id) {
        _this.setData({
          isPlayingMusic: false
        });
        app.globalData.isPlayingMusic = false;
        app.globalData.musicPostId = _this.data.id;
      }
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
      title: !if_collected ? "收藏成功" : "已取消收藏",
      duration: 1000
    })
  },
  /* 点击转发按钮调用的函数，可实现分享功能 */
  onShareAppMessage: function (res) {
    return {
      title: this.data.postData.title,
      imageUrl: this.data.postData.imgSrc,
      path: '/pages//posts/posts-detail/detail.wxml?postId=' + this.data.id
    }
  },
  /* 点击图片上的音乐播放或暂停按钮调用的事件处理函数 */
  musicPlay: function () {
    var music = this.data.postData.music;
    var _this = this;
    var musicPlay = this.data.isPlayingMusic;
    /* 如果音乐在播放，那么将暂停播放音乐并且改变各有关音乐播放状态的数据 */
    if (musicPlay) {                
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: !musicPlay
      });
      app.globalData.isPlayingMusic = false;
      app.globalData.musicPostId = _this.data.id;
    }
    /* 如果音乐没有在播放，那么将播放音乐并且改变各有关音乐播放状态的数据 */
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
      app.globalData.isPlayingMusic = true;
      app.globalData.musicPostId = _this.data.id;
    }
  }
})