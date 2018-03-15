// 1、引入fs模块
var fs = require('fs');
// 2、调用模块下的方法
// 判断文件是否存在：用户请求文件，确认服务器有没有
// 第一个参数：判断文件的 路径； 第二个参数：回调函数
// bol，有无该文件，true or false
/*
fs.exists('./demo.txt', function(bol){
    console.log(bol);// false
});
*/

/*  通过相对路径获取到绝对路径 */
// 第一个参数：相对路径 ；回调函数
/*fs.realpath('demo.txt', function(err, path){
    // 转换失败，则err有值，否则为null
    if (err) {
        console.log(err);
    } else {
        console.log(path);
    }
});*/

/* 修改文件名 */
// 第一参数原路径；二参数为修改为。。。 三为回调函数
fs.rename('./demo.txt', './data.txt', function(err){
    if (err) {
        console.log(err);
    }else{
        console.log('修改成功');
    }
})




