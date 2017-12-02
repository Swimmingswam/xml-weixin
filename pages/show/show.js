var showdata = require("../../data/show_data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*date: "Sep 5 2017",
    title: "致迷茫的你",
    shoucang: "123",
    read: "200"*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*var showdata = [
      {
        date: "Sep 5 2017",
        title: "致迷茫的你",
        content: "每个人都有迷茫的时候，就像没有灵魂的木偶、没有方向的航船、没有阳光的向日葵……于是，我们都在随波逐流中平庸地耗费光阴，感概岁月静好的同时却无奈其中。其实，迷茫的你也可以活得幸福，因为每天你有八个小目标应该要坚持：",
        shoucang: 112,
        read: 123,
        images: {
          author_image: "../../images/00.jpg",
          image: "../../images/1.jpg"
        }
      }
    ]*/
    /*this.data.show_key=showdata.datalist;*/
    this.setData(
      { show_key: showdata.datalist}
    );
  },
  click:function(event){
    var postid = event.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: "../datail/detail?id=" + postid
    })
  },
  onclick: function (event) {
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: "../datail/detail?id=" + postid
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