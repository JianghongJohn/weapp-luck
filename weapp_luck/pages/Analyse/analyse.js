
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({
  data: {
    totalCount:100,
    frontCount: 40,
    backCount: 60,
    dataList:[],
    coin:{}
  },
  onLoad: function (options) {
    // var coin = JSON.parse(options.coin)
    // let coin_id = coin._id;
    let coin_id = '5c93700fc75d87223c9d1321'
    // this.setData({
    //   coin: coin
    // })
    let that = this;
    api.getOneCoinThrowData(coin_id,result=>{
      let data = result.data;
      if(data == null){
        that.setData({
          dataList: [],
          frontCount: 0,
          backCount: 0,
          totalCount: 0,
        })
        return;
      }
      for (let item of data.throw_list ){
        var date = new Date(item.time);//就是这么简单
        item.time = util.formatTime(date)

      }

      that.setData({
        dataList: data.throw_list,
        frontCount: data.front_count,
        backCount: data.back_count,
        totalCount: data.front_count + data.back_count,
      })
    })
  },
  onShareAppMessage(res) {

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来跟我一起定制你的专属幸运币',
      path: '/pages/Home/home'
    }
  }
})
