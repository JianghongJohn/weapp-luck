//index.js
//获取应用实例
const api = require('../../utils/api.js')
const config = require('../../config.js')
const throwResultUtil = require('./throwResultUtil.js')
Page({
  data: {
    action:"euro-no",
    btnActionName: "buttonAction",
    butonTitle:'抛硬币',
    isHidden:true,
    imageUrl:'http://wow.techbrood.com/uploads/160101/backeuro.png',
    isfront:true,
    coin: { "isvalid": true, "_id": "5c8918a5c36bb63c72871b87", "front_url": "images/tmp_0355205d5b8f6c20ddfc10d7443c1566.png", "back_url":"images/tmp_95dd145f4ab939e17e40abd8f0db1ed8.png","front_title":"硬币正面标题","back_title":"硬币反面标题","title":"硬币标题","__v":0},
    back_url:'',
    front_url:'',
    throwList:[],
    isAnalyse: false
  },
  onLoad: function (options){
    if (options.coin != undefined){
      var coin = JSON.parse(options.coin)
      this.setData({
        coin: coin,
        butonTitle: coin.title,
        isAnalyse:true
      })
    }
    this.setData({
      back_url: config.uploadImageUrl + this.data.coin.back_url,
      front_url: config.uploadImageUrl + this.data.coin.front_url,
      butonTitle: this.data.coin.title,
      imageUrl: config.uploadImageUrl + this.data.coin.front_url,
    })
    
  },
  buttonAction:function(e){
    console.log('此处旋转触发')
    var result = Math.floor(Math.random() * 2)
    console.log(result)
    this.setData({
      action: result == true ? "euro" : "euro-add",
      btnActionName:'adAction',
      isHidden: true,
      isfront : result,
      imageUrl: result == true ? this.data.front_url : this.data.back_url,
    });

    var that = this;
    setTimeout(function () {

      let resultStr = result ? '正' : '反';
      let throwList = that.data.throwList;
      throwList.push(resultStr);
      that.setData({
        'isHidden': false,
        action: "euro-no",
        btnActionName: 'buttonAction',
        throwList: throwList
      });
      that.addThrowData(result,that.data.coin._id);
    }, 5000);
  },
  adAction: function (e) {
    console.log('此处屏蔽')
    
  },
  // 上传抛掷记录到服务器
  addThrowData:function(isFront,coin_id){
    
    let message =  throwResultUtil.sortWithThrowList(this.data.throwList);
    if(message != null){
      wx.showModal({
        title: '小运气',
        content: message,
        showCancel:false,
        confirmColor: '#e6b529',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }

    api.createThrowData(isFront, coin_id, result => {

    })
  },
  // 跳转到数据分析页面
  getAnalyse:function(){
    wx.navigateTo({
      url: '../Analyse/analyse?coin=' + JSON.stringify(this.data.coin),
    })
  },
  onShareAppMessage(res){

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来跟我一起定制你的专属幸运币',
      path: '/pages/Home/home',
      imageUrl:'../../Image/Wellcome.png'
    }
  }
})
