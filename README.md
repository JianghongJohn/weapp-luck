# weapp-luck
微信小程序项目（3D硬币动画），项目后端使用node.js,MongoDB的mongoose框架，Koa网络框架,阿里云服务器OSS对象存储
### 一、项目基本效果
![IMG_1783.PNG](https://upload-images.jianshu.io/upload_images/5273985-b76a38699385bb81.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![WeChatefb6bc3a3b27596687426d135e1d8020.png](https://upload-images.jianshu.io/upload_images/5273985-b5f761fd1c76f8a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![IMG_1788.PNG](https://upload-images.jianshu.io/upload_images/5273985-782312f93ed3e222.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![IMG_1801.PNG](https://upload-images.jianshu.io/upload_images/5273985-f7f7b76c80bb5508.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 二、后台框架搭建
>项目后端使用node.js,MongoDB数据库的mongoose框架，Koa网络框架,阿里云服务器OSS对象存储。

>koa网络框架,利用了koa框架实现http请求，比较简单可以查看具体代码，或者查询koa相关的使用方法。下边贴出基本的实现。
```
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
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
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);
```
>MongoDB非关系型数据库，利用mongoose框架，搭建项目所需的数据库结构。下边贴出基本的实现。
```
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
```
### 三、阿里云centos服务端配置
> 首先最基础的是域名购买，域名备案，SSL证书配置，Nginx配置，基本上比较简单，阿里云上都有教程的，下边是我Nginx的配置信息:
proxy_pass:http://localhost:3000;,这条就是设置了反向代理，将域名直接代理到3000端口下，也就是我node服务所指定的端口。443端口就是https默认的访问端口，正确配置下证书的地址就能使用https访问了。
```
server {
        listen 80 default backlog=2048;
        listen       443 ssl http2 default_server;
        listen       [::]:443 ssl http2 default_server;
        server_name  [www.xiaoyun7.com;](http://www.xiaoyun7.com;/)
        root         /usr/share/nginx/html;
        ssl_certificate "/etc/nginx/chain/1945854_[www.xiaoyun7.com.pem";](http://www.xiaoyun7.com.pem/)
        ssl_certificate_key "/etc/nginx/chain/1945854_[www.xiaoyun7.com.key";](http://www.xiaoyun7.com.key/)
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location /{
        proxy_pass [http://localhost:3000;](http://localhost:3000;)
        }
        error_page 404 /404.html;
            location = /40x.html {
        }
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```
>MongoDB按照一般教程设置即可，注意设置为开机启动，oss文件服务器需要绑定下我的域名，这样就能通过我的域名上传和下载文件了，这里也就是在阿里云控制台oss的域名管理中，上传下新的证书也就好了。oss比较简单，建一个唯一的Bucket然后会生成自己专属的域名，并支持https，其实不用绑定域名，可直接添加但小程序域名列表里。

### 四、小程序开发要点
>阿里云OSS文件上传，我这里将key和密钥直接写在了小程序代码里(最好通过服务器获取)，参考代码是来自([微信小程序上传文件到阿里云OSS的代码](https://www.jianshu.com/p/34d6dcbdc2e5))。
因为我的图片是需要裁剪的，所以图片选择的时候增加了图片剪裁页面，参考代码为we-cropper.js这个文件，github上也有相应的开源代码，我也是拿别人的来做的。

>简单的3d效果，我是通过图片堆叠来实现的，就是改变坐标轴的Z轴放置图片，比如我厚度为10px，我就会放10张图片叠在一起，每张相隔1个px，然后最后一张做下翻转，这样就有3D的硬币效果了。
然后是抛掷动画：用的是keyframes这个关键帧动画效果，这里遇到的问题就是keyframes只会在页面第一次加载的时候做动画，那么我的做法就是利用js不断切换样式，这样下次点击抛掷的时候就有新的动画效果。

```
#euro {
  width: 150px;
  height: 150px;
  margin-left: -75px;
  margin-top: -75px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  animation: spin 5s linear;
}
@keyframes spin {
  0% {
    top: 50%;
    transform: rotateX(0deg);
  }

  10% {
    top: 40%;
    transform: rotateX(1440deg);
  }

  20% {
    top: 30%;
    transform: rotateX(2160deg);
  }

  30% {
    top: 20%;
    transform: rotateX(2880deg);
  }

  40% {
    top: 15%;
    transform: rotateX(2960deg);
  }

  50% {
    top: 10%;
    transform: rotateX(3040deg);
  }/* 60% {
        top: 15% ;transform:  rotateX(3120deg);
    }
    70% {
        top: 20% ;transform:  rotateX(3200deg);
    } */

  100% {
    top: 50%;
    transform: rotateX(4320deg);
  }
}
```

### 总结
这个是我个人从原型设计到UI效果到前端开发到后端开发完全个人完成的一个项目，当然非常的简陋，这里就当是记录下个人的学习记录，希望有看到的大神们多多提意见，帮助小弟进步。[github地址https://github.com/Jianghongjohn/weapp-luck](https://github.com/Jianghongjohn/weapp-luck)
