Page({
  setOut: function () {
    // wx.navigateTo({
    //   url: '/pages/posts/post',
    // })
    wx.redirectTo({
      url: '/pages/posts/post'
    })
  },
  onUnload: function() {
    console.log('onUnload');
  },
  onHide: function() {
    console.log('onHide');
  }
})