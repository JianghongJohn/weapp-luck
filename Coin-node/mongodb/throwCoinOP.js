// 查询数据
var throwCoinModel = require('./throwCoin.js').throwCoinModel

function UserOp() {
    //查询所有数据
    this.findAll = function (callback) {
        var conditions = {}; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        throwCoinModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.findThrowCoinByWechatId = function (wechat_id, callback) {
        var conditions = {
            'wechat_id': wechat_id
        }; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        throwCoinModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.findThrowCoinByWechatIdAndCoinId = function (wechat_id, coin_id, callback) {
        var conditions = {
            'wechat_id': wechat_id,
            'coin_id': coin_id
        }; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        throwCoinModel.findOne(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.findThrowCoinByCoinId = function (coin_id, callback) {
        var conditions = {
            'coin_id': coin_id
        }; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        throwCoinModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        }).pretty();
    }
    this.createThrowCoin = function (throwCoin, callback) {

        var mongooseEntity = new throwCoinModel(throwCoin);
        mongooseEntity.save((err) => {
            if (err) {
                console.log(err);
                callback(false)
            } else {
                console.log('save successful!');
                callback(true)
            }
            //关闭数据库连接
            // db.close();
        });
    }
    this.insertCoinList = function (throwCoin, callback) {

        var conditions = {
            'wechat_id': throwCoin.wechat_id,
            'coin_id': throwCoin.coin_id
        }; //查询条件
        data = throwCoin.throwData;
        var fields = {}; //待返回的字段
        var options = {};
        throwCoinModel.findOne(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
                callback(false)
            } else {
                if (result == null) {
                    this.createThrowCoin({
                        'wechat_id': throwCoin.wechat_id,
                        'coin_id': throwCoin.coin_id,
                        'throw_list': [data],
                        'front_count':data.isFront?1:0,
                        'back_count':data.isFront?0:1,
                    }, result => {
                        callback(result)
                    })
                } else {
                    result.throw_list.push(data);
                    if (data.isFront) {
                        result.front_count ++;
                    }else{
                        result.back_count ++;
                    }
                    result.save();
                    callback(true)
                }


            }
            // db.close();
        });
    }
}
module.exports = UserOp;