/**
 * 小程序配置文件
 */
var fileHost = "你的oss文件存储地址"
let config = {
  // url: 'http://localhost:3000/',//测试http
  url: 'https://www.xiaoyun7.com/',//正式环境https

 //本地静态key
  kopenId: "openId",
  kunionId: "unionId",
  kuserInfo: "userInfo",
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  AccessKeySecret: 'AccessKeySecret',//oss密钥，为了方便写在本地了，可以通过服务器发放
  OSSAccessKeyId: 'OSSAccessKeyId',//oss，为了方便写在本地了，可以通过服务器发放
  timeout: 87600 //这个是上传文件时Policy的失效时间
};

module.exports = config
