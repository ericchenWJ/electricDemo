class DBCollection{
  constructor(id) {
    this.storageKeyName = 'collectionList';
    this.id = id;
  }

  //获取指定id号的数据
  getItemById() {
    var collectionData = this.getAllCollData();
    var len = collectionData.length;
    var data = [];
    var index = -1;
    for (var i = 0; i < len; i++) {
      if (collectionData[i].id == this.id) {
        index = i;
        data = collectionData[i];
        break;
      }
    }
    return {
      index: index,
      data:  data
    }
  }

  /*得到全部数据*/
  getAllCollData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').collectionList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  /*初始化缓存数据*/
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  //收藏
  collect(id,title) {
    return this.updateData(id,title,'collect');
  }

  //更新数据
  updateData(id, title,category) {
    var itemData = this.getItemById();
    var colltionData = itemData.data;
    var allcolltionData = this.getAllCollData();
    if(colltionData == ""){
      var collection = {};
      collection.id = id;
      collection.date = "2018-07-31";
      collection.title = title;
      collection.collectionNum = 1;
      collection.collectionStatus = true;
      allcolltionData.push(collection);
      console.log(allcolltionData);
      wx.setStorageSync('collectionList', allcolltionData);
      return collection;
    }else{
      switch (category) {
        case 'collect':
          //处理收藏
          if (!colltionData.collectionStatus) {
            //如果当前状态是未收藏
            colltionData.collectionNum++;
            colltionData.collectionStatus = true;
          } else {
            // 如果当前状态是收藏
            colltionData.collectionNum--;
            colltionData.collectionStatus = false;
          }
          break;
        default:
          break;
      }
      allcolltionData[itemData.index] = colltionData;
      this.execSetStorageSync(allcolltionData);
      return colltionData;
    }
  }
};

export { DBCollection }