var util = {
  starsCount: function(stars) {
    var a = parseInt(parseInt(stars) / 10);
    var b = [];
    for(var i = 0; i < 5; i ++) {
      if(i < a){
        b.push(1);
      }
      else {
        b.push(0);
      }
    }
    return b;
  }
};

module.exports = util;