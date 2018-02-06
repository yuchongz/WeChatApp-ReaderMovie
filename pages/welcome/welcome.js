Page({
  setOut: function () {
    console.log('1');
    wx.switchTab({     // 跳转到tabBar 页面，并关闭其他所有非 tabBar 页面
      url: '/pages/posts/post'
    });
  },
  onUnload: function() {
    // console.log('onUnload');
  },
  onHide: function() {
    // console.log('onHide');
  }
})