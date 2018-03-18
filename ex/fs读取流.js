var fs = require('fs');

var rs = fs.createReadStream('./data.txt');
var ws = fs.createWriteStream('./data副本呀.txt');
/*rs.on('data',function(chunk){
    ws.write(chunk)
});*/

// pipe方法 : 当读出数据全部写入后，才进行下一次读取。内存利用充分，但是读取时间较长
rs.pipe(ws);