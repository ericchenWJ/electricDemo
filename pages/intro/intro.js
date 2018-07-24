Page({
     data: {
         comName: "",
         comPeople: "",
         comDate: "",
         comType: "",
         comRegInfo: ""
     },
     onLoad: function () {
         var that = this;
     wx.request({
      url: "https://www.easy-mock.com/mock/5b484a2fd8d71b716154ea7e/electric/intro",
      method: 'GET',
      header:{
         "Content-Type":"application/json"
      },
      success: function(res){
        that.setData({
          comName: res.data.comName,
          comPeople: res.data.comPeople,
          comDate: res.data.comDate,
          comType: res.data.comType,
          comRegInfo: res.data.comRegInfo
        })
      }
     })
  }
})