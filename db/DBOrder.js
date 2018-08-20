var DBOrder=function(){
    this.storageKeyName='orderList';
}
var DBOrder=function(orderId){
    this.storageKeyName='orderList';
    this.orderId = orderId;
}

DBOrder.prototype={
    getAllOrderData:function(){
        var res = wx.getStorageSync(this.storageKeyName);
        if(!res){
            res = require('../data/data.js').orderList;
            this.execSetStorageSync(res);
        }
        return res;
    },
    //获取订单详情
    getOrderItemById(){
        var orderData = this.getAllOrderData();
        console.log(orderData[0].orderId+","+this.orderId);
        var len = orderData.length;
        for(var i=0;i<len;i++){
            if(orderData[i].orderId == this.orderId){
                console.log(orderData[0].orderId+","+this.orderId);
                return {
                    index: i,
                    data: orderData[i]
                }
            }
        }
    },
    execSetStorageSync:function(data){
        wx.setStorageSync(this.storageKeyName,data)
    }
};
 module.exports = {
     DBOrder:DBOrder
 }