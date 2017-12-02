// pages/datail/detail.js
var postsdata = require("../../data/show_data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    this.setData({
      currentpostid: postid
    })
    //this.data.currentpostid=postid;
    var postdata = postsdata.datalist[postid];
    /*this.data.postdata = postdata;*/
    this.setData(
      {postdata: postdata}
    );
   /*var collectdatas={
     0:false,
     1:true
   }*/
   var collectdatas=wx.getStorageSync("collected");
   if(collectdatas){
     var collectdata = collectdatas.postid;
     this.setData({
       collected:collectdata
     })
   }
   else{
     var collectdatas={};
     collectdatas[postid]=false;
     wx.setStorageSync("collected", collectdatas);
   }
  },
  click:function(event){
    var postcollects=wx.getStorageSync("collected");
    var postcollect = postcollects[this.data.currentpostid];
    postcollect = !postcollect;
    postcollects[this.data.currentpostid] = postcollect;
    wx.setStorageSync("collected", postcollects);
    this.setData({
      collected: postcollect
    })
    wx.showToast({
      title: postcollect?'收藏成功':"取消收藏",
      duration:2000,
      icon:"success"
    })
  },
  click2:function(event){
    wx.showActionSheet({
      itemList: [
        "分享到朋友圈",
        "分享给微信好友",
        "分享给QQ好友",
        "分享到微博"
      ],
      itemColor:"#405f80"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})