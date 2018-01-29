Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_content : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_content = [
      {
        date: "Jan 06 2018",
        author_img: "/images/avatar/1.png",
        title: "正是虾肥蟹壮时",
        post_img: "../../images/post/crab.png",
        content: "Web前端开发是从网页制作演变而来的，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，那时网站的主要内容都是静态的，用户使用网站的行为也以浏览为主。",
        collect_num: 100,
        view_num: 128
      },
      {
        date: "Jun 06 2017",
        author_img: "/images/avatar/1.png",
        title: "正是虾肥蟹壮时",
        post_img: "../../images/post/crab.png",
        content: "Web前端开发是从网页制作演变而来的，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，那时网站的主要内容都是静态的，用户使用网站的行为也以浏览为主。",
        collect_num: 91,
        view_num: 121
      }
    ];
    this.setData({
      post_content: post_content
    });
  }
})