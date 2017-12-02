var utils = require("../../utils/utils.js");
var app= getApp();
Page({
  data: {
    intheaters: {},
    comesoon: {},
    top250: {},
    moreurl:{},
    moviesshow:true,
    sreachshow:false,
    searchresults:{}
    },
  onLoad: function (event) {
    var intheaters = app.globaldata.doubanurl+"/v2/movie/in_theaters" + "?start=0&count=3";
    var comesoon = app.globaldata.doubanurl +"/v2/movie/coming_soon" + "?start=0&count=3";
    var top250 = app.globaldata.doubanurl +"/v2/movie/top250" + "?start=0&count=3";
    this.getmoviesdata(intheaters, "intheaters", "正在热播" );
    this.getmoviesdata(comesoon, "comesoon", "即将上映");
    this.getmoviesdata(top250, "top250", "豆瓣top250" );
  },
  getmoviesdata: function (url, setdata,ctitle) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        that.getdouban(res.data, setdata, ctitle);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  getdouban: function (resdata, setdata, ctitle) {
    var movies = [];
    for (var idx in resdata.subjects) {
      var subject = resdata.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: utils.gatstarsdata(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageurl: subject.images.large,
        movieid: subject.id
      }
      movies.push(temp);
    }
    this.setData({
      movies:movies
    })
    var readydata={};
     readydata[setdata]={
       movies:movies,
       ctitle: ctitle
       }
     this.setData(
       readydata
     )
  },
  moreclick:function(event){
    var moreurl=event.currentTarget.dataset.moreurl;
    wx.navigateTo({
      url: 'more/more?moreurl='+moreurl
    })
  },
  onBindFocus:function(event){
   this.setData({
     moviesshow: false,
     sreachshow: true
   })
  },
  concel:function(event){
    this.setData({
      moviesshow: true,
      sreachshow: false,
      searchresults:{}
    });
  },
  onchange:function(event){
    var text=event.detail.value;
    var searchurl = app.globaldata.doubanurl+"/v2/movie/search?q="+text;
    this.getmoviesdata(searchurl,"searchresults","");
  },
  onmovie:function(event){
    var movieid=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movies/movies-detail/movies-detail?movieid=' + movieid
    })
  }
})
