
var db = require('./mongodb/db').db
var UserOp = require('./mongodb/userOP.js');
var CoinOp = require('./mongodb/coinOP.js');
var ThrowCoinOp = require('./mongodb/throwCoinOP.js');
//网络
require('./interface/api.js')