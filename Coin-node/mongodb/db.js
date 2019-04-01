'use strict';

var mongoose=require('mongoose');

var url =  'mongodb://localhost:27017/coin'

mongoose.connect(url, {useMongoClient:true});
mongoose.Promise = global.Promise;
// 引入模块
var mongoose=require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/coin')
// 得到数据库连接句柄
var db=mongoose.connection;
//通过 数据库连接句柄，监听mongoose数据库成功的事件

db.once('open' ,() => {
	console.log(
    '连接数据库成功'
  );
})

db.on('error', function(error) {
    console.error(
      'Error in MongoDb connection: ' + error
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      '数据库断开，重新连接数据库'
    );
    mongoose.connect(url, {server:{auto_reconnect:true}});
});

//导出数据
module.exports={
  db:db
}