//用于本地存储和获取

/**
 * 本地存储
 */
function setStorage(thisKey , thisValue){
  wx.setStorage({
    key: thisKey,
    data: thisValue
  })
}

/**
 * 本地存储同步
 */
function setStorageSync(thisKey, thisValue) {
  try {
    wx.setStorageSync(thisKey, thisValue)
  } catch (e) {
  }
}
/**
 * 获取数据，回调
 */
function getStorage(thisKey, callBack){
  wx.getStorage({
    key: thisKey,
    success: function (res) {
      console.log(res.data)
      callBack(res.data);
    }
  })
}
/**
 * 获取数据同步，回调
 */
function getStorageSync(thisKey) {
  try {
    var value = wx.getStorageSync(thisKey)
    if (value) {
      return value;
    }
  } catch (e) {
    // Do something when catch error
  }
}

module.exports = {
  getStorage: getStorage,
  getStorageSync: getStorageSync,
  setStorage: setStorage,
  setStorageSync: setStorageSync,
}  