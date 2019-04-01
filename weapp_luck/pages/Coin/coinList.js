const config = require('../../config.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:0,
    wellComeUrl: "../../Image/coin_list_bg.png",
    dataList: [
    ],
    url: config.uploadImageUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getData();
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scrollHeight: windowHeight * 750 / windowWidth * 0.8
    })
  },
  // 获取数据
  getData: function () {
    let that = this;
    
    api.getCoinList(function (res) {
      //停止刷新

      wx.stopPullDownRefresh()
      let data = res.data;
      that.setData({
        dataList: data
      })
    })
  },
  /**
   * 编辑硬币
   */
  editCoin:function(e){
    // debugger
    console.log('编辑硬币'+e.currentTarget.dataset.idx);
    let index = e.currentTarget.dataset.idx;
    let coin = this.data.dataList[index];

    wx.navigateTo({
      url: 'coin?coin='+JSON.stringify(coin),
    })

  },
  throwCoin:function(e){
    console.log('抛掷硬币' + e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let coin = this.data.dataList[index];

    wx.navigateTo({
      url: '../index/index?coin=' + JSON.stringify(coin),
    })
  },
  /**
   * 新增硬币
   */
  addCoin: function (e) {
  
    wx.navigateTo({
      url: 'coin?',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来跟我一起定制你的专属幸运币',
      path: '/pages/Home/home',
    }
  }
})