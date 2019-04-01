// 引入模块
var mongoose=require('mongoose');
//定义表数据结构
var throwCoinModel=new mongoose.Schema({
    wechat_id:String,
    coin_id:String,
    front_count:{type:Number,default:0},
    back_count:{type:Number,default:0},
    throw_list:[{isFront:Boolean,
        time:Date,
        isvalid:{type:Boolean,default:true},}]
    
})
// 将表的数据结构和表关联起来
var throwCoinModel=mongoose.model("throwCoin",throwCoinModel);
//导出数据
module.exports={
    throwCoinModel:throwCoinModel
}