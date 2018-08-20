//index.js  
//获取应用实例  
var DBOrder = require('../../db/DBOrder.js').DBOrder
var DBCollection = require('../../db/DBCollection.js').DBCollection
var app = getApp()
Page({
    data: {
        id:0,
        title:'',
        price:0,
        url:'',
        totalPrice:0,
        // input默认是1
		num: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled',
    collectionStatus: false,
    collectionNum: 0,
		order:[],
    collection:null
    },
    onLoad:function (options){
		var dbOrder = new DBOrder()
    var dbCollection = new DBCollection(options.id);
    var collectionData = dbCollection.getItemById().data;
    var status =false;
      var collectionNum =0;
    if (collectionData == ""){
      status = false;
      collectionNum =0;
    }else{
      status = collectionData.collectionStatus;
      collectionNum = collectionData.collectionNum;
    }
        wx.setNavigationBarTitle({
            title:options.title
        }),
        this.setData({
            id:options.id,
            title:options.title,
            price:options.price,
            totalPrice:options.price,
            url:options.url,
			      orderList:dbOrder.getAllOrderData(),
            collection: collectionData,
            collectionStatus:status,
            collectionNum: collectionNum
        })
    },
    /* 点击减号 */
	bindMinus: function() {
		var num = this.data.num;
		// 如果大于1时，才可以减
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
            totalPrice: (num * this.data.price).toFixed(1),
			num: num,
			minusStatus: minusStatus
		});
	},
	/* 点击加号 */
	bindPlus: function() {
		var num = this.data.num;
		// 不作过多考虑自增1
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num < 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
            totalPrice: (num * this.data.price).toFixed(1),
			num: num,
			minusStatus: minusStatus
		});
	},
	/* 输入框事件 */
	bindManual: function(e) {
		var num = e.detail.value;
		// 将数值与状态写回
		this.setData({
            totalPrice: (num * this.data.price).toFixed(1),
			num: num
		});
	},
	/**购买事件 */
	buy: function(e){
		var titleVar = this.data.title;
		var numVar = this.data.num;
		var totalPriceVar = this.data.totalPrice;
		for (let i in this.data.orderList) {
          this.data.order.push(this.data.orderList[i])
		  console.log(this.data.order[i])
        };
		var orderVar = this.data.order;

		wx.request({
			url: "https://www.easy-mock.com/mock/5b484a2fd8d71b716154ea7e/electric/buy",
			header: {  
                 "Content-Type": "application/x-www-form-urlencoded"  
            },
			method: "POST",
			data: { title: this.data.title,totalPrice:this.data.totalPrice},  
            complete: function( res ) {  
			   if(res.data.result == 1){
				   var order ={};
				   order.orderId = 3;
				   order.date = "2018-07-31";
				   order.title = titleVar;
				   order.totalPrice = totalPriceVar;
				   order.num = numVar;
				   orderVar.push(order);
				   console.log(orderVar);
				   wx.setStorageSync('orderList', orderVar);
				   wx.showToast({
		  	          title: '购买成功',
		  	          icon: 'success',
		  	          duration: 2000
		           })
			   }else{
				   wx.showToast({
		  	          title: '购买失败',
		  	          icon: 'loading',
		  	          duration: 2000
		           })
			   }
           }  
		})
	},
  //收藏事件
  onCollectionTap: function(event){
    var dbCollection = new DBCollection(this.data.id);
    var newData = dbCollection.collect(this.data.id,this.data.title);
    console.log(newData)

    // 重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    // 应当有选择的更新部分数据

    this.setData({
      collectionStatus: newData.collectionStatus,
      collectionNum: newData.collectionNum
    })

    // 交互反馈
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },
  comment: function(event){
    var id = this.data.id;
    wx.navigateTo({
      url: '../comment/comment?id='+id
    })
  }

})