# Study-NBlog
node &amp; express &amp; mongodb Study
---
## 对应模块的用处
- express: web 框架
- express-session: session 中间件
- connect-mogo: 将 session 存储于 mongodb，结合 express-session 使用
- connect-flash: 页面通知提示的中间件，基于 session 实现
- ejs: 模版
- express-formidable: 接收表单及文件的上传中间件
- config-lite: 读取配置文件
- marked: markdown 解析
- moment: 时间格式化
- mongolass: mongodb 驱动
- objectid-to-timestamp: 根据 ObjectId 生成时间戳
- sha1: sha1 加密，用于密码加密
- winston: 日志
- express-winston: 基于 winston 的用于 express 的日志中间件
- mocha 和 supertest: 常用的测试组合，通常用来测试 restful 的 api接口
- istanbul: 常用的生成测试覆盖率的库

## 配置
- Study-NBlog/config/default.js

## 权限控制
- Study-NBlog/middlewares/check.js

## 视图模版
- Study-NBlog/views/*
