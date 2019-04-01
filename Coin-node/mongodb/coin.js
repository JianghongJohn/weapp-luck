// 引入模块
var mongoose=require('mongoose');
//定义表数据结构
var coinModel=new mongoose.Schema({
    id:Number,
    wechat_id:String,
    title:String,
    front_title:String,
    back_title:String,
    front_url:String,
    back_url:String,
    isvalid:{type:Boolean,default:true},
})
// 将表的数据结构和表关联起来
var coinModel=mongoose.model("coin",coinModel);
//导出数据
module.exports={
    coinModel:coinModel
}