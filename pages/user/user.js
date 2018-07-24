//获取应用实例
const app = getApp()

Page({
    data:{
        userInfo: null,
        photo:'/images/photo_default.png',
        hasUserInfo: false
    },
    chooseImage: function(){
       var _this = this;  
		wx.chooseImage({  
			count: 1, // 默认9  
			// 可以指定是原图还是压缩图，默认二者都有  
			sizeType: ['original', 'compressed'], 
			// 可以指定来源是相册还是相机，默认二者都有
			sourceType: ['album', 'camera'], 
		 // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片   
			success: function (res) {  
				_this.setData({  
				  photo:res.tempFilePaths  
				})  
			}  
		}) 
    },
    onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        photo: app.globalData.userInfo.avatarUrl,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          photo: app.globalData.userInfo.avatarUrl,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            photo: app.globalData.userInfo.avatarUrl,
            hasUserInfo: true
          })
        }
      })
    }
  },
})