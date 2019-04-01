const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const UserOp = require('../mongodb/userOP');
const CoinOp = require('../mongodb/coinOP');
const ThrowCoinOp = require('../mongodb/throwCoinOP');
/**
 * 发起请求(根据code获取openId)
 */
var request = require('request');
 
/** 用户创建*/
router.post('/user/openid', async (ctx, next) => {
    var code = ctx.request.body.code;
    
    return new Promise(function (resolve, reject) {
        let appid = 'wx8e4e86ea761f1e02'
    let secret = 'f2777a68d9d7a3b4dbb7df985fea398b'
    let grant_type = 'authorization_code'

    let url = 'https://api.weixin.qq.com/sns/jscode2session?' + 'appid=' + appid + '&secret=' + secret +'&js_code=' +code + '&grant_type=' +grant_type 

    request({
        url: url,
        method: "GET",
        json: true,
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
            ctx.response.body = {'data':body,success:false};
        }else{
            ctx.response.body = {'data':'',success:false}
        }
        resolve()
    });
    })
});

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...${ctx.request.body}`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
/** 用户创建*/
router.post('/user/create', async (ctx, next) => {
    var user = ctx.request.body;
    var userOP = new UserOp();
    return new Promise(function (resolve, reject) {
    userOP.findUserByWechatId(user.wechat_id,function(res){
        if (res == false) {
            userOP.createUser(user, result => {
                // resolve(next());
                console.log('新增用户' + result);
                ctx.response.type = 'application/json'
                let data = {
                    'data': result,
                    success:result==false?false:true,
                    message:'新增用户'+ (result==false?'失败':'成功')
                }
                ctx.response.body = data;
                resolve()
            })          
        }else{
            userOP.updateUser(user, result => {
                // resolve(next());
                console.log('更新用户' + result);
                ctx.response.type = 'application/json'
                let data = {
                    'data': result,
                    success:result==false?false:true,
                    message:'更新用户'+ (result==false?'失败':'成功')
                }
                ctx.response.body = data;
                resolve()
            })
        }

    })
})
    
});
/** 用户更新*/
router.post('/user/update', async (ctx, next) => {
    var user = ctx.request.body;
    var userOP = new UserOp();
    return new Promise(function (resolve, reject) {

        userOP.updateUser(user, result => {
            // resolve(next());
            console.log('新增用户' + result);
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'更新用户'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })

    
});
/** 用户硬币创建*/
router.post('/coin/create', async (ctx, next) => {
    var coin = ctx.request.body;
    var coinOp = new CoinOp();
    // userOP.findAll();
    return new Promise(function (resolve, reject) {

        coinOp.createCoin(coin, result => {
            // resolve(next());
            console.log('新增幸运币' + result);
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'新增幸运币'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })
    
});

/** 用户硬币更新*/
router.post('/coin/update', async (ctx, next) => {
    var coin = ctx.request.body;
    var coinOp = new CoinOp();
    // userOP.findAll();
    return new Promise(function (resolve, reject) {

        coinOp.updateCoin(coin, result => {
            // resolve(next());
            console.log('更新幸运币' + result);
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'更新幸运币'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })
});
/** 用户硬币查询*/
router.post('/coin/find', async (ctx, next) => {
    var wechat_id = ctx.request.body.wechat_id;

    var coinOp = new CoinOp();
    // userOP.findAll();
    return new Promise(function (resolve, reject) {

        coinOp.findCoinByWechatId(wechat_id, result => {
            // resolve(next());
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'获取幸运币'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })
});
/** 硬币根据id查询*/
router.post('/coin/findById', async (ctx, next) => {
    var coin_id = ctx.request.body.coin_id;

    var coinOp = new CoinOp();
    // userOP.findAll();
    return new Promise(function (resolve, reject) {

        coinOp.findCoinById(coin_id, result => {
            // resolve(next());
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'获取幸运币'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })
});
/** 用户抛掷记录插入*/
router.post('/coin/throw', async (ctx, next) => {
    var coin = ctx.request.body;
    var coinOp = new ThrowCoinOp();
    // userOP.findAll();
    return new Promise(function (resolve, reject) {

        coinOp.insertCoinList(coin, result => {
            // resolve(next());
            console.log('新增抛掷记录' + result);
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'新增抛掷记录'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })
});

/** 用户抛掷记录查询*/
router.post('/coin/userThrow', async (ctx, next) => {
    var
        wechat_id = ctx.request.body.wechat_id || '';

    var throwOp = new ThrowCoinOp();
    return new Promise(function (resolve, reject) {
        // throwOp.findThrowCoinByWechatIdAndCoinId('wechat_id1','5c7ccc1fd8bf601ab86fdc20',result =>{
        throwOp.findThrowCoinByWechatId(wechat_id, result => {
            // resolve(next());
            console.log('查询成功' + result);
            ctx.response.type = 'application/json'
            let data = {
                'data': result.throw_list
            }

            ctx.response.body = data;
            resolve()
        })
    })
});
/**某个硬币抛掷几次 */
router.post('/coin/throwOneCoin', async (ctx, next) => {
    var
        wechat_id = ctx.request.body.wechat_id || '',
        coin_id = ctx.request.body.coin_id || '';

    var throwOp = new ThrowCoinOp();
    return new Promise(function (resolve, reject) {
        // throwOp.findThrowCoinByWechatIdAndCoinId('wechat_id1','5c7ccc1fd8bf601ab86fdc20',result =>{
        throwOp.findThrowCoinByWechatIdAndCoinId(wechat_id, coin_id, result => {
            // resolve(next());
            console.log('查询成功' + result);
            ctx.response.type = 'application/json'
            let data = {
                'data': result,
                success:result==false?false:true,
                message:'查询抛掷记录'+ (result==false?'失败':'成功')
            }
            ctx.response.body = data;
            resolve()
        })
    })
});


const koaBody = require("koa-body")
/**文件相关 */
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        uploadDir: 'upload/',
        onFileBegin: (name, file) => { // 文件存储之前对文件进行重命名处理
            const fileFormat = file.name.split('.');
            //如何确定唯一的文件名1.随机数加时间戳
            let imageName = 'jneth_img_'+`${Date.now()}` + Math.floor(Math.random()*100) + Math.floor(Math.random()*100) +''

            file.name = `${imageName}.${fileFormat[fileFormat.length-1]}`
            file.path = `upload/${file.name}`;
        }
    }
}));
/**
 * 上传图片
 */
const fs = require('fs')
router.post('/upload', async (ctx, next) => {
    const file = ctx.request.files.file; //获取上传文件
    ctx.response.type = 'application/json'
    if (file) {
        let data = {
            'data': file.name,
            success:true,
            message:'上传图片'+ '成功'
        }
        return ctx.response.body = data;    
    }else{
        let data = {
            'data': file.name,
            'success':false,
            'message':'上传图片失败'
        }
        
        return ctx.response.body = data;
    }
})
/**
 * 下载图片
 */
const send = require('koa-send');
router.get('/download/:name', async (ctx,next) =>{
    const name = ctx.params.name;
    const path = `upload/${name}`;
    ctx.attachment(path);
    await send(ctx, path);
     
 })
   
// add router middleware:
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');


