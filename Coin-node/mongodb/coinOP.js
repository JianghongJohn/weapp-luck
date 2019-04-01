// 查询数据
var coinModel = require('./coin.js').coinModel

function CoinOP() {
    //查询所有数据
    this.findAll = function (callback) {
        var conditions = {}; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        coinModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.findCoinByWechatId = function (wechat_id, callback) {
        var conditions = {
            'wechat_id': wechat_id
        }; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        coinModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
                callback([]);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.findCoinById = function (_id, callback) {
        var conditions = {
            '_id': _id
        }; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        coinModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.createCoin = function (coin, callback) {
        var mongooseEntity = new coinModel(coin);
        mongooseEntity.save((err) => {
            if (err) {
                console.log(err);
                callback(false);
            } else {
                console.log('save successful!');
                callback(true);
            }
            //关闭数据库连接
            // db.close();
        });

    }
    this.updateCoin = function (coin, callback) {

        var wherestr = {
            '_id': coin._id
        };
        var updatestr = coin
        coinModel.updateOne(wherestr, updatestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
                callback(false)
            } else {
                console.log("Res:" + res);
                callback(true)
            }
        })
    };

}
module.exports = CoinOP;