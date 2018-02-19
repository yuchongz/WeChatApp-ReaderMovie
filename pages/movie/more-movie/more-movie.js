var util = require('../../../util/util.js');
var app = getApp();
Page({
  data: {
    movies: []
  },
  onLoad: function (options) {
    var category = options.category;
    var dataUrl = null;
    this.setData({
      category: category
    });
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '豆瓣TOP250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.setData({
      dataUrl: dataUrl
    });
    util.request(dataUrl, this.processDoubanData);
  },
  /* 处理豆瓣返回的数据的函数 */
  processDoubanData: function (data) {
    var movie = [];
    var concatArray = [];
    var length = data.subjects.length;
    /* 按照返回的电影数目循环处理返回的信息，只获取需要的信息，每个电影信息单独组成一个对象并推入到movie数组中 */
    for (var i = 0; i < length; i++) {
      var subject = data.subjects[i];
      if (subject.title.length > 6) {   // 电影名字若太长超过6个字符，只截取电影名字的前6个字符，后面的字符用“...”代替
        subject.title = subject.title.substring(0, 6) + '...';
      }
      // 每个电影需要的信息都放在tmp对象中
      var tmp = {
        stars: util.starsCount(subject.rating.stars),  // 表示电影的评分星星数，每10个代表一个星星
        movieName: subject.title,   // 电影名字
        movieImageUrl: subject.images.large,  // 电影海报
        movieId: subject.id,  // 电影id
        movieGrade: subject.rating.average  // 电影的评分
      };
      // 把tmp对象推入到movie数组中
      movie.push(tmp);
    }
    concatArray = this.data.movies.concat(movie);  // 和原来的页面数据拼接
    this.setData({   // 改变视图层
      movies: concatArray
    });
    wx.hideNavigationBarLoading();  // 停止导航栏loading动画
    wx.stopPullDownRefresh();       // 停止当前页面下拉刷新
  },
  onReady: function () {
    var category = this.data.category;
    wx.setNavigationBarTitle({   // 动态改变导航栏的标题
      title: category
    });
  },
  /* 上滑触底事件处理函数 */
  onReachBottom: function () {
    wx.showNavigationBarLoading(); // 开始导航栏loading动画
    //console.log('加载更多');
    var length = this.data.movies.length;  // 用于判断应该加载哪些数据
    var nextUrl = this.data.dataUrl + '?start=' + length + '&count=20';  // 每次加载20条数据
    util.request(nextUrl, this.processDoubanData);
  },
  /* 下拉刷新事件处理函数 */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    //console.log('下拉刷新');
    var refreshUrl = this.data.dataUrl + '?start=0&count=20';
    this.data.movies = [];  // 清空原有的数据，但视图层不会相应改变
    util.request(refreshUrl, this.processDoubanData);
  },
  movieDetail: function (event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + movieId
    })
  }
})