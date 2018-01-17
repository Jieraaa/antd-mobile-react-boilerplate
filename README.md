## 用react-biolerplate和antd-mobile搭建的手机端系统

### 登录页面
<img src="http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/7290450d3470f36c66e9ced630653eb31516180833.jpeg" alt="Login Page" align="center"/>

### 内容页面
<img src="http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/b6e679550d22fe92a053de4738721da71516179622.jpeg" alt="Management Page" align="center" />

### Install
    yarn install

### Start
    sh start.sh
    //Please modifiy port and API host in start.sh.

More docs please refer to [react-boilerplate](./README_ORIGIN.md).

## 目录结构

* app
    * components 公共组件
        * Layout 内容页公共布局
    * containers 页面
        * App 入口文件
        * Demo 样例页面
        * Homepage 样例页面
        * Login 登录页面
        * NotFound 404页面模板
    * util 公共常量、方法、接口等
        * Api.js 请求相关接口
        * Const.js 存放常量，如路由、Cookie等
        * eventProxy.js 事件代理
        * format.js 格式化字符串
    * app.js 入口文件
    * index.html html模板
    * routes.js 路由配置页面
* internals webpack配置等
* server 服务启动相关
* start.sh 本地启动脚本

## 怎样添加一个新页面（新路由）

1. 在app/container中新建文件夹，大驼峰命名，入口文件问index.js
2. 在app/routes.js中添加路由，一定要放到notfound页面之前，一级目录参考login，二级目录参考menu0

## 怎样发请求

参考Demo页面，请求通过node进行代理转发，避免跨域问题