var util = {
  starsCount: function (stars) {
    var a = parseInt(parseInt(stars) / 10);
    var b = [];
    for (var i = 0; i < 5; i++) {
      if (i < a) {
        b.push(1);
      }
      else {
        b.push(0);
      }
    }
    return b;
  },
  request: function (url, callback) {
    wx.request({
      url: url,
      success: function (res) {  // 若请求成功则去处理返回的数据
        callback(res.data);
      },
      fail: function (errMsg) {
        console(errMsg);
      }
    })
  },
  convertToCastString: function (casts) {
    var castsjoin = "";
    for (var idx in casts) {
      castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
  },
  convertToCastInfos: function (casts) {
    var castsArray = []
    for (var idx in casts) {
      var cast = {
        img: casts[idx].avatars ? casts[idx].avatars.large : "",
        name: casts[idx].name
      }
      castsArray.push(cast);
    }
    return castsArray;
  }
};

module.exports = util;