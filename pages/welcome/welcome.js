Page({
  data: {
    userAvatar: '/images/头像.jpg',
    userName: '虫虫'
  },
  setOut: function () {
    wx.switchTab({     // 跳转到tabBar 页面，并关闭其他所有非 tabBar 页面
      url: '/pages/movie/movie'
    });
  }
})