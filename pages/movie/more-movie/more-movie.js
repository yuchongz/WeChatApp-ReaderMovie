Page({
  data: {
  
  },
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      category: category
    });
  },
  onReady: function () {
    var category = this.data.category;
    wx.setNavigationBarTitle({   // 动态改变导航栏的标题
      title: category
    });
  }
})