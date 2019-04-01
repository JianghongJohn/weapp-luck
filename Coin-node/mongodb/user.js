// 引入模块
var mongoose=require('mongoose');

//定义表数据结构
var userModel=new mongoose.Schema({
    id:Number,
    wechat_id:String,
    avatarUrl:String,
    city:String,
    country:String,
    gender:Number,
    language:String,
    nickName:String,
    province:String,
    isvalid:{type:Boolean,default:true},
    throw_count:{type:Number,default:100},
})
// 将表的数据结构和表关联起来
var userModel=mongoose.model("user",userModel);
// 添加数据

// userModel.insertMany(seafoodList,function(err,result){
//     if(err){
//         console.log("数据添加失败");
//         throw err;
//     }
//     console.log("数据添加成功:",result);
// })
//导出数据
module.exports={
    userModel:userModel
}