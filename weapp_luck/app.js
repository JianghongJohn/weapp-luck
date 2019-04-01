//app.js
const api = require('./utils/api.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: function (res) {
            if (res.code) {
              api.getOpenId(res.code);
              //获取openId
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    
  }
})