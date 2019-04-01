const config = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coin: { back_url: 'download/jneth_img_15528151369084675.png', front_url: 'download/jneth_img_15528151544933039.png',}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: config.url + that.data.coin.front_url,
        success: function (res) {
          resolve(res);
        }
      })
    });

    let promise2 = new Promise(function (resolve, reject) {
      var uid = wx.getStorageSync('uid')
      console.log(uid)
      wx.getImageInfo({
        src: config.url + that.data.coin.back_url,
        success: function (res) {
          resolve(res);
        }
      })
    });
    Promise.all([promise1,promise2]).then(res => {
      const ctx = wx.createCanvasContext('shareCanvas')
      // 底图
      ctx.drawImage(res[0].path, 0, 0, 100, 100)
      ctx.drawImage(res[1].path, 120, 0, 100, 100)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(50, 50, 50, 0, 2 * Math.PI)
      ctx.setStrokeStyle('#ead99f')
      ctx.draw()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})