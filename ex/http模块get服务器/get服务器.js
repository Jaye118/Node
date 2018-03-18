// 1引入模块
var http = require('http');
var fs = require('fs');
var url = require('url');

// 创建服务
var server = http.createServer(function(req, res){
    // 在浏览器访问localhost:8888/index.html?user=123&pass=123
    var urlobj = url.parse(req.url, true);// true参数为对象

    if(urlobj.pathname == '/index.html' ){

        var rs = fs.createReadStream('index.html');// 读文件
        rs.pipe(res);// 写文件：res就是写入流，目的地是用户的浏览器
        // 不用res.end()，往页面发数据，异步操作，不可断开
    } else if (urlobj.pathname == '/login.html') {

        var rs = fs.createReadStream('login.html');
        rs.pipe(res);
    }else if(urlobj.pathname == '/login'){

        if (urlobj.query.user == '123' && urlobj.query.user == '123' ){
            res.write('success');
            res.end();
        }else {
            res.write('error');
            res.end();
        }
    }
});

// 监听端口
server.listen(8888, function(){
    console.log('success');
});

