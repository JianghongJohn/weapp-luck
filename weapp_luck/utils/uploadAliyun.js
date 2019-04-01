const env = require('../config.js');

const Base64 = require('./crypto/Base64.js');

require('./crypto/hmac.js');
require('./crypto/sha1.js');
const Crypto = require('./crypto/crypto.js');



const uploadFile = function (filePath, dir, successc, failc) {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }

  console.log('上传图片…');
  const aliyunFileKey = dir + filePath.replace('wxfile://', '');//我直接拿微信本地的名字当做传到服务器上的名字了，dir传的是images/，表示要传到这个目录下
  // const aliyunFileKey = fileW + '' + (new Date().getTime()) + '_' + objectId + '.mp4';
  //const aliyunFileKey = fileW 
  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = env.OSSAccessKeyId;
  //const policyBase64 = env.Policy;
  //const signature = env.Signature;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);//获取签名

  console.log('aliyunFileKey=', aliyunFileKey);
  console.log('aliyunServerURL', aliyunServerURL);
  wx.uploadFile({
    url: aliyunServerURL,
    filePath: filePath,
    name: 'file',//必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function (res) {
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      console.log('上传图片成功', res)
      successc(aliyunFileKey);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = uploadFile;