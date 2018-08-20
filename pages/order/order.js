var DBOrder = require('../../db/DBOrder.js').DBOrder

Page({
    data:{
    },
    onLoad:function(){
        var dbOrder = new DBOrder();
        this.setData({
            orderList:dbOrder.getAllOrderData()
        })
    }
})