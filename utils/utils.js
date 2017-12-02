function gatstarsdata(stars){
  var num=stars.toString().substring(0,1);
  var arr=[];
  for(var i=0;i<=5;i++){
      if(i<=num){
        arr.push(1);
      }
      else{
        arr.push(0);
      }
  }
  return arr;
};
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
};
function viewpicture(e) {
  var src = e.currentTarget.dataset.src;
  wx.previewImage({
    current: src, // 当前显示图片的http链接
    urls: [src] // 需要预览的图片http链接列表
  })
}

module.exports = {
  gatstarsdata: gatstarsdata,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  viewpicture: viewpicture
}
