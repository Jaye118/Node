// 1、引入http模块
var http = require('http');
// 2、创建http服务
// 根据客户端（浏览器）请求的地址不同，向前端发送不同的数据
// 服务器收到浏览器的http请求，就回来触发回调函数
var server = http.createServer(function(req, res){
    console.log('收到请求');
    // req：请求对象
    // res: 响应对象
    console.log(req.url);// 保存请求的路径
    console.log(req.method);// 请求方法

    // res.end()断开连接
});

// 3、监听端口号
server.listen(8888, function () {
    console.log('success');
});