var post_content = require('../../data/posts_data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_content: post_content
    });
  },
  readDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'posts-detail/detail?postId=' + id,
    })
  },
  swiperTap: function (event) {
    var id = event.target.dataset.id;
    wx.navigateTo({
      url: 'posts-detail/detail?postId=' + id,
    })
  }
})