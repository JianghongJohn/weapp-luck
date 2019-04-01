const api = require('../../utils/api.js')
const config = require('../../config.js')
const uploadImage = require('../../utils/uploadAliyun.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    front_url: '../../Image/portrait.png',
    back_url: '../../Image/portrait.png',
    buttonTitle: '生成幸运币',
    formData: {
      front_url: '../../Image/portrait.png',
      back_url: '../../Image/portrait.png',
      front_title: '',
      back_title: '',
      title: '',
      wechat_id: '',
      _id: ''
    },
    isSelectImg:false,
    selectType:'front',
    selectUrl:'',
    //原始数据，用于删除原始图片
    tempData: {},
    
  },
  onShow:function(){
    let that = this;
    debugger
    //上传图片
    if(this.data.isSelectImg){
      const tempFilePaths = this.data.selectUrl;
debugger
      //filePath为要上传的本地文件的路径
      //images/为oss目录
      
      uploadImage(tempFilePaths, "images/",
        function (res) {
          debugger
          console.log("上传成功")
            if (that.data.selectType == 'front') {
              that.setData({
                'formData.front_url': res,
                front_url: config.uploadImageUrl + res
              })
            } else {
              that.setData({
                'formData.back_url': res,
                back_url: config.uploadImageUrl + res
              })
            }
            wx.showToast({
              title: '上传成功！',
              icon: 'success'
            })

          //todo 做任何你想做的事
        }, function (res) {
          console.log("上传失败")
          //todo 做任何你想做的事
        })

    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载详情
    if (options.coin) {
      var coin = JSON.parse(options.coin)
      this.setData({
        formData: coin,
        front_url: config.uploadImageUrl + coin.front_url,
        back_url: config.uploadImageUrl + coin.back_url,
        buttonTitle: '更新幸运币',
        tempData: coin,
        isAnalyse:true
      })
    }

  },

  selectFront: function () {
    let that = this;
    that.setData({
      isSelectImg:false,
      selectType:'front'
    })
    wx.navigateTo({
      url: '../cutImage/index?imageRouteData=selectUrl',
    })
  },
  selectBack: function () {
    let that = this;
    that.setData({
      isSelectImg: false,
      selectType: 'back'
    })
    wx.navigateTo({
      url: '../cutImage/index?imageRouteData=selectUrl',
    })
  },

  /**
   * 上传
   */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const titles = e.detail.value;
    this.setData({
      'formData.title': titles.title,
      'formData.front_title': titles.front_title,
      'formData.back_title': titles.back_title,
    })

    if (this.data.formData.title == '') {
      wx.showToast({
        title: '请输入幸运币标题',
        icon: 'none'
      })
      return;
    }
    if (this.data.formData.front_title == '') {
      wx.showToast({
        title: '请输入幸运币正面标题',
        icon: 'none'
      })
      return;
    }
    if (this.data.formData.back_title == '') {
      wx.showToast({
        title: '请输入幸运币反面标题',
        icon: 'none'
      })
      return;
    }
    if (this.data.formData.front_url == '../../Image/portrait.png' || this.data.formData.front_url == undefined || this.data.formData.front_url == null) {
      wx.showToast({
        title: '请输入幸运币正面图片',
        icon: 'none'
      })
      return;
    }
    if (this.data.formData.back_url == '../../Image/portrait.png' || this.data.formData.back_url == undefined || this.data.formData.back_url == null) {
      wx.showToast({
        title: '请输入幸运币反面图片',
        icon: 'none'
      })
      return;
    }
    api.createCoin(this.data.formData,result=>{
      wx.showToast({
        title: result.message,
        icon:'success'
      })

      if(result.success){
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 1000) //延迟时间 这里是1秒  
      }
    })
  },
})