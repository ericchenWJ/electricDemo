//index.js  
//获取应用实例  
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
		minusStatus: 'disabled'
    },
    onLoad:function (options){
        wx.setNavigationBarTitle({
            title:options.title
        }),
        this.setData({
            id:options.id,
            title:options.title,
            price:options.price,
            totalPrice:options.price,
            url:options.url
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
	}

})