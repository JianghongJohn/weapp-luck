// 查询数据
var userModel = require('./user.js').userModel

function UserOp() {
    //查询所有数据
    this.findAll = function (callback) {
        var conditions = {}; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        userModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.findUserByWechatId = function (wechat_id,callback) {
        var conditions = {
            'wechat_id': wechat_id
        }; //查询条件
        var fields = {}; //待返回的字段
        var options = {};
        userModel.find(conditions, fields, options, (err, result) => {
            if (err) {
                console.log(err);
                callback(false);
            } else {
                console.log(result);
                callback(result);
            }
            // db.close();
        });
    }
    this.createUser = function (user,callback) {
        var mongooseEntity = new userModel(user);
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

    this.updateUser = function (user, callback) {

        var wherestr = {
            'wechat_id': user.wechat_id
        };
        var updatestr = user
        userModel.updateOne(wherestr, updatestr, function (err, res) {
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
module.exports = UserOp;