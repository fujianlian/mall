# 闲商城

优达学城商城类小程序项目。本项目使用的是云开发进行后端搭建，是一个比较综合的项目，需要具备一定的 **JavaScript、CSS** 知识。

[tencent-cloud分支](https://github.com/fujianlian/mall/tree/tencent-cloud)是基于**腾讯云服务**进行后端开发的，相对比来说比较简单，建议选择**云开发**模式开发

## 小程序截图 
 
![1](./data/screenshot/screenshot1.png) | ![2](./data/screenshot/screenshot2.png) | ![3](./data/screenshot/screenshot3.png) | ![4](./data/screenshot/screenshot4.png) | 
| :--: | :--: | :--: | :--: | 
| 首页 | 订单 | 购物车 | 个人中心 | 
 
![1](./data/screenshot/screenshot5.png) | ![2](./data/screenshot/screenshot6.png) | ![3](./data/screenshot/screenshot7.png) | ![4](./data/screenshot/screenshot8.png) | 
| :--: | :--: | :--: | :--: | 
| 商品详情 | 添加评论 | 用户评论 | 未登录 |

# 云开发 quickstart 

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力： 
优达学城商城类小程序项目。本项目后端需要搭建腾讯云服务，构建数据库，实现api以及图片存储，小程序前端需要通过后端返回的接口实现一个商城的正常运行话功能，比如商品商品列表、订单列表、购物车，同时还可以练习微信账号授权登录，是一个比较综合的项目，需要具备一定的 **JavaScript、CSS以及SQL** 知识。 
 
- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库 
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理 
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码 

## 参考文档 
 
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html) 


# 运行准备

## 运行前准备

1. 注册[小程序开发帐号](https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index)，完成注册之后，登录[微信公众平台官网](https://mp.weixin.qq.com/) ，点击 **“设置 -> 开发设置”**，获取你的 **AppID 帐号**，后面初始化项目需要用到。

## 运行项目

1. 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

2. 下载源码，打开微信开发者，选择小程序导入源码，**AppID改为自己申请的**

3. 接下来申请云开发功能，进入云开发页面

* 在存储里创建 **products** 文件夹，将data/products里的所有图片上传到products文件夹中

* 在数据库里创建 **order/product/review/trolley** 四个集合，将data/products.json导入到product集合中，注意修改image的地址前缀

* 上传云函数，运行即可

## 贡献

* 如果你在使用过程中遇到问题，欢迎给我提Issue

* 如果你有好的想法，欢迎pull request

* 觉得不错的话，顺手 **点个Star**，笔者需要您的支持

