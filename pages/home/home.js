//index.js  
//获取应用实例  
var app = getApp()
Page({
  data: {
    movies: [],
    caseList:[]
  },
  // // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b484a2fd8d71b716154ea7e/electric/bannerlist',  //开小程序微信公众平台设置小程序开发设置，配置服务器合法域名（必须是https）
      method: "GET",
      header:{
         "Content-Type":"application/json"
      },
      success: function (res) {
       that.setData({
          movies: res.data
        });
         // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {
  //   var that = this;
  //   // 显示加载图标
  //   wx.showLoading({
  //     title: '玩命加载中',
  //   })
  //   // 页数+1
  //   page = page + 1;
  //   wx.request({
  //     url: 'https://xxx/?page=' + page,
  //     method: "GET",
  //     // 请求头部
  //     header: {
  //       'content-type': 'application/text'
  //     },
  //     success: function (res) {
  //       // 回调函数
  //       var moment_list = that.data.moment;

  //       for (var i = 0; i < res.data.data.length; i++) {
  //         moment_list.push(res.data.data[i]);
  //       }
  //       // 设置数据
  //       that.setData({
  //         moment: that.data.moment
  //       })
  //       // 隐藏加载框
  //       wx.hideLoading();
  //     }
  //   })

  // },
  onLoad: function () {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5b484a2fd8d71b716154ea7e/electric/bannerlist",
      method: 'GET',
      header:{
         "Content-Type":"application/json"
      },
      success: function(res){
        that.setData({
          movies: res.data
        })
      }
    }),
    wx.request({
      url: "https://www.easy-mock.com/mock/5b484a2fd8d71b716154ea7e/electric/list",
      method: 'GET',
      header:{
         "Content-Type":"application/json"
      },
      success: function(res){
        that.setData({
          caseList: res.data
        })
      }
    })
  },
  itemClick: function(e){
    var $item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?id='+$item.id+"&title="+$item.title+"&url="+$item.url+"&price="+$item.price
    })
  }
})  
