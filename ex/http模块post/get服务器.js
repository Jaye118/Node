// 1引入模块
var http = require('http');
var fs = require('fs');
var url = require('url');

// 引入第三方模块
var qs = require('querystring');


// 创建服务
var server = http.createServer(function(req, res){
    // req就是request(请求)
    // res就是response(响应)
    // 在浏览器访问localhost:8888/index.html?user=123&pass=123
    var urlobj = url.parse(req.url, true);// true参数为对象  实际是以？为截断口

    if(urlobj.pathname == '/index.html' ){

        var rs = fs.createReadStream('index.html');// 读文件
        rs.pipe(res);// 写文件：res就是写入流，目的地是用户的浏览器
        // 不用res.end()，往页面发数据，异步操作，不可断开
    } else if (urlobj.pathname == '/login.html') {

        var rs = fs.createReadStream('login.html');
        rs.pipe(res);
    }else if(urlobj.pathname == '/login'){
        // 获取post提交的数据

        // 超过64K
        /*var temp = '';
        req.on('data', function(chunk){
            temp += chunk;
        });
        req.on('end', function(){
            var queryObj = qs.parse(temp);
            if(queryObj.user == '123'){
                res.write('success');
                res.end();
            }else{
                res.write('error');
                res.end();
            }
        });*/


        req.on('data', function(chunk){
            var queryObj =  qs.parse( chunk.toString() )// 字符串转为对象

            if(queryObj.user == '123'){
                res.write('success');
                res.end();
            }else{
                res.write('error');
                res.end();
            }
        })

    }
});

// 监听端口
server.listen(8888, function(){
    console.log('success');
});

