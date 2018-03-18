var fs = require('fs');

var rs = fs.createReadStream('./data.txt');
var ws = fs.createWriteStream('./data副本呀.txt');
rs.on('data',function(chunk){
    ws.write(chunk)
});