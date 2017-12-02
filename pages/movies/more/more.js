var utils = require("../../../utils/utils.js");
var app = getApp()
Page({
  data: {
    requesturl:"",
    counturl:0,
    isemepty:true,
    movies:{}
  },
  onLoad: function (options) {
    var moreurl = options.moreurl;
    //console.log(moreurl);
    this.setData({
      moreurl: moreurl
    });
    var url;
    var urlname;
    switch (moreurl) {
      case "正在热播": url = app.globaldata.doubanurl + "/v2/movie/in_theaters";
        urlname ="intheaters" ;
        break;
      case "即将上映": url = app.globaldata.doubanurl + "/v2/movie/coming_soon";
        urlname = "comesoon";
        break;
      case "豆瓣top250": url = app.globaldata.doubanurl + "/v2/movie/top250";
        urlname = "top250";
        break;
    }
    this.data.requesturl=url;
    utils.http(url, this.getdouban);
  },
  getdouban: function(resdata) {
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
    var allmovies={};
    if(!this.data.isemepty){
       allmovies=this.data.movies.concat(movies);
    }else{
      allmovies=movies;
      this.data.isemepty=false;
    }
    this.setData({
      movies: allmovies
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.data.counturl += 20;
  },
  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.moreurl
    });
  },
  scrollmore:function(event){
    var nexturl=this.data.requesturl+"?start="+this.data.counturl+"&count=20";
    this.getmoviesdata(nexturl);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh:function(event){
    var nexturl2 = this.data.requesturl + "?start=0&count=20";
    this.data.movies={};
    this.data.isemepty=true;
    this.data.counturl=0;
    this.getmoviesdata(nexturl2);
    wx.showNavigationBarLoading();
  },
  onmovie: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/movies/movies-detail/movies-detail?movieid=' + movieid
    })
  }
})