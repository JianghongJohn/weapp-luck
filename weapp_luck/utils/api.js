const config = require('../config');
const storage = require('localStorage.js')
//Http Get
function requestGet(url, data, isLogin, cb) {

  wx.request({
    url: config.url + url,
    data: data,
    method: 'GET',
    success: function (res) {
      cb(res, true)
    },
    fail: function () {
      cb(data, false)
    }
  })
}
function requestPost(url, data, isLogin, cb) {

  wx.request({
    url: config.url + url,
    data: data,
    method: 'POST',
    success: function (res) {
      cb(res, true)
    },
    fail: function () {
      cb(data, false)
    }
  })
}
/**
 * 获取openId
 */
function getOpenId(code){
  requestPost("user/openid",{'code':code},false,function(res){
    console.log(res.data)
    storage.setStorageSync(config.kopenId, res.data.data.openid)
  })
}
/**
 * 创建或者更新用户
 */
function createUser(userInfo,callback) {
  
  let wechat_id = storage.getStorageSync(config.kopenId);
  userInfo.wechat_id = wechat_id;
  requestPost("user/create", userInfo, false, function (res) {
    console.log(res)
    callback(res);
  })
}
/**
 * 获取用户硬币
 */
function getCoinList( callback) {
  let wechat_id = storage.getStorageSync(config.kopenId);
  requestPost("coin/find", { 'wechat_id': wechat_id}, false, function (res) {
    console.log(res.data)
    callback(res.data);
  })
}
/**
 * 创建硬币或者更新硬币
 */
function createCoin(userInfo, callback) {
  debugger
  if (userInfo.wechat_id == '' || userInfo.wechat_id == null || userInfo.wechat_id == undefined){
    userInfo.wechat_id = storage.getStorageSync(config.kopenId);
  }
  if (userInfo._id == '' || userInfo._id == null || userInfo._id == undefined) {
    delete userInfo._id;
    requestPost("coin/create", userInfo, false, function (res) {
      console.log(res)
      callback(res.data);
    })
  }else{
    requestPost("coin/update", userInfo, false, function (res) {
      console.log(res)
      callback(res.data);
    })
  }
}

/**
 * 创建抛掷记录
 */
function createThrowData(isFront,coin_id, callback) {

  let wechat_id = storage.getStorageSync(config.kopenId);
  let time = new Date();
  let throwData = {
    wechat_id: wechat_id,
    coin_id: coin_id,
    throwData: {
      isFront: isFront,
      time: time,}
    }
  requestPost("coin/throw", throwData, false, function (res) {
    console.log(res)
    callback(res.data);
  })
}

/**
 * 获取单个幸运币的抛掷记录
 */
function getOneCoinThrowData( coin_id, callback) {

  let wechat_id = storage.getStorageSync(config.kopenId);
  let throwData = {
    wechat_id: wechat_id,
    coin_id: coin_id,
  }
  requestPost("coin/throwOneCoin", throwData, false, function (res) {
    console.log(res)
    callback(res.data);
  })
}

module.exports = {
  getOpenId: getOpenId,//获取openid
  createUser: createUser,//更新用户信息
  getCoinList: getCoinList,//获取用户幸运币
  createCoin: createCoin,//新增和编辑幸运币
  createThrowData: createThrowData,//新增抛掷记录
  getOneCoinThrowData: getOneCoinThrowData,//单个幸运币的抛掷记录
}