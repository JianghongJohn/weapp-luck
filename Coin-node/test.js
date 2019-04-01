var db = require('./mongodb/db').db
var UserOp = require('./mongodb/userOP.js');
var CoinOp = require('./mongodb/coinOP.js');
var ThrowCoinOp = require('./mongodb/throwCoinOP.js');
//网络
require('./interface/api.js')

function testUserOP(){
    var userOP = new UserOp();
    // userOP.findAll();
    userOP.findUserByWechatId('wechat_id2')
}
function testCoinOp(){
    var coinOp = new CoinOp();
    var newCoin = {
        '_id': '5c7ccc1fd8bf601ab86fdc20',
        'wechat_id':'wechat_id1',
        'title':"起床",
        'front_title':'起111',
        'back_title':'不起111',
        'front_url':'http://...',
        'back_url':'http://...test',
        'isvalid':true
    };
    // userOP.findAll();
    coinOp.updateCoin(newCoin)
}
function testCoinFind(){
    var coinOp = new CoinOp();
    var result =  coinOp.findCoinById('5c790f1fa364d9303eaf9ffb');
    console.log(result)
}
function testInsertThrowCoin(){
    var throwOp = new ThrowCoinOp();
    var newCoin = {
        wechat_id:'wechat_id1',
        coin_id:'5c7ccc1fd8bf601ab86fdc20',
        isFront:true,
        time:new Date(),
        isvalid:true,
    };
    // userOP.findAll();
    throwOp.createThrowCoin(newCoin)

}
function testFindUserCoin(){
    var throwOp = new ThrowCoinOp();
    throwOp.findThrowCoinByWechatIdAndCoinId('wechat_id1','5c7ccc1fd8bf601ab86fdc20',result =>{
        console.log(result[0].wechat_id)
    })
    
    // result.toArray();
}
// testUserOP();
// testCoinOp();
// testCoinFind();
// testInsertThrowCoin();
// testFindUserCoin();
// var throwOp = new ThrowCoinOp();
    // throwOp.createThrowCoin({'wechat_id': 'oynlY5HnJmlHACtbeVfTuP0h5-_8',
    // 'coin_id': '5c8b7f0b833b850dd1eb1aa2','throw_list':[]},result =>{

    // })
    // throwOp.insertCoinList({
    //     'wechat_id': 'oynlY5HnJmlHACtbeVfTuP0h5-_8',
    //     'coin_id': '5c8b7f0b833b850dd1eb1aa2',
    //     'throwData':{'time':'232',isFront:true,isvalid:true}
    // },result =>{

    // });

