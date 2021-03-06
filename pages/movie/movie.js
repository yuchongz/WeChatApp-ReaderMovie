var util = require('../../util/util.js');
var app = getApp();
Page({
  data: {
    categoryContainer: true,
    searchResultContainer: false,
    in_theaters: {},
    coming_soon: {},
    top250: {},
    searchResult: {},
    search_value: "",
    placeholder: ""
  },
  onLoad: function() {
    /* 获取正在热映的电影详情的豆瓣请求url，查询参数表示只请求第一页，一页内只有三个电影信息 */
    var in_theaters = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3';
    /* 获取即将上映的电影详情的豆瓣请求url，查询参数表示只请求第一页，一页内只有三个电影信息 */
    var coming_soon = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3';
    /* 获取评分前250的电影详情的豆瓣请求url，查询参数表示只请求第一页，一页内只有三个电影信息 */
    var top250 = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';
    this.getMovieData(in_theaters,"in_theaters","正在热映");
    this.getMovieData(coming_soon,"coming_soon","即将上映");
    this.getMovieData(top250,"top250","豆瓣TOP250");
  },
  // 请求外部电影数据的函数
  getMovieData: function (url, key, categoryTitle) {
    var _this = this;
    wx.request({
      url: url,
      success: function (res) {  // 若请求成功则去处理返回的数据
        //console.log(res.data);
        _this.processDoubanData(res.data, key, categoryTitle);
      },
      fail: function (errMsg) {
        console(errMsg);
      }
    })
    
  },
  // 处理数据的函数
  processDoubanData: function (data, key, categoryTitle){
    var movie = [];
    var length = data.subjects.length;
    /* 按照返回的电影数目循环处理返回的信息，只获取需要的信息，每个电影信息单独组成一个对象并推入到movie数组中 */
    for (var i = 0; i < length; i++) {  // 把正在热映的第一部电影放在input组件的placeholder属性中
      var subject = data.subjects[i];
      if (key === "in_theaters") {
        if (i === 0) {
          this.setData({
            placeholder: subject.title
          });
        }
      }
      if (subject.title.length > 7) {   // 电影名字若太长超过6个字符，只截取电影名字的前6个字符，后面的字符用“...”代替
        subject.title = subject.title.substring(0,7) + '...';
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
    var readyData = {};
    readyData[key] = {
      movies: movie,  // 每个模块应显示的电影信息
      categoryTitle: categoryTitle // 每个模块的名字
    };
    this.setData(readyData);  //把模块数据放在data对象中，绑定数据供渲染层使用
  },
  // 点击“更多>”的事件处理函数
  moreMovie: function(event) {
    var categoryTitle = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + categoryTitle
    })
  },
  /* 搜索函数，点击手机键盘的完成按钮或者搜索组件失去焦点时触发 */
  search: function(event) {
    var text = event.detail.value;
    if (!text) {
      text = this.data.placeholder;
      this.setData({
        search_value: text
      });                   
      // this.setData({
      //   categoryContainer: true,
      //   searchResultContainer: false,
      //   searchResult: {}
      // });
      // return;
    }
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieData(searchUrl, "searchResult", "");
  },
  /* 搜索组件获得焦点时触发 */
  focus: function() {
    this.setData({
      categoryContainer: false,
      searchResultContainer: true
    });
  },
  /* 点击搜索栏右边的X号的事件处理函数 */
  cancel: function() {
    this.setData({
      categoryContainer: true,
      searchResultContainer: false,
      searchResult: {},               // 为了清空上一次搜索结果
      search_value: ""                // 为了清空搜索栏用户输入的文字
    });
  },
  movieDetail: function(event) {
    var movieId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + movieId
    })
  }
})