const storage = require('../../utils/localStorage.js')
const api = require('../../utils/api.js')
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: null,
    nickName: "小运气",
    iconUrl: "../../Image/icon.png",
    wellComeUrl: "../../Image/wellcome_bg.png",
    isAuthor:false
  },
  onLoad: function (optine) {
    // wx.showToast({
    //   icon:'none',
    //   title: '由于业务需求，请先授权获取用户信息！',
    // })

    let that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //设定为已经获取授权，点击进入
          that.setData({
            isAuthor: true
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              that.setData({
                iconUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
              })
              api.createUser(res.userInfo,result =>{
                // console.log(result)
              });
            }
          })
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    //处理用户授权信息
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      //授权失败
      wx.showToast({
        icon: 'none',
        title: '您点了拒绝将会无法获取到用户信息！',
      })
    } else {
      //保存数据
      let that = this;
      that.setData({
        iconUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        isAuthor:true
      })
      api.createUser(e.detail.userInfo, result => {
        // console.log(result)
      });
    }
  },
  //进入APP
  enterApp:function(){
    console.log('进入')
    wx.redirectTo({
      url: '../Coin/coinList',
    })
  }
})