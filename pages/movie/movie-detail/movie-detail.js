var util = require('../../../util/util.js');
var app = getApp();
Page({
  data: {
    detail: {}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var detailUrl = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.request(detailUrl, this.processDoubanData);
  },
  /* 处理豆瓣返回的数据的函数 */
  processDoubanData: function(data) {
    if (!data) {
      return;
    }
    /* start 为了防止因为没有directors数据而导致报错的方法 */
    var director = {   
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    /* end 为了防止因为没有directors数据而导致报错的方法 */
    var detail = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.starsCount(data.rating.stars),
      movieGrade: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    };
    this.setData({
      detail: detail
    });
  },
  /* 点击小图显示大图的事件处理函数 */
  checkBigImg: function(event) {
    var url = event.currentTarget.dataset.src;
    wx.previewImage({
      current: url,
      urls: [url]
    });
  }
})