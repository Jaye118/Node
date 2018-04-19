var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var loger=require('../utils/loger');
var defualtCfg={
    url:CONSTANT.remoteHost+'/api/',
    contentType:'application/json'
};


/**
 *   promise整合接口  api/users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function totaltask (req, res, next) {
    let returnJSON = {
        "code": "0",
        "msg": "成功",
        "data": {
            "cluelistNum": 0,
            "consultNum": 0,
            "triageNum": 0,
            "localNum": 0,
            "waitNum": 0,
            "operateNum": 0
        }
    };
    defualtCfg.method="GET";
    var promise1 = new Promise (function (resolve) {
        var opt=appUtil.extend({},defualtCfg);
        opt.v = req.headers['v'];
        opt.authorization=req.headers['authorization'];//authorization
        opt.url+=`clue/pageList?userUnionId=${req.body.userUnionId}&group=${req.body.group}&searchName=${encodeURI(req.body.searchName)}&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
        opt.callBack=function(error, response, body){
            if(error){
                res.send(error);
                resolve();
            }else {
                body = JSON.parse(body);
                if (body.data) {
                    returnJSON.data.cluelistNum  =body.data.list.length;
                }
                resolve();
            }
        };
        httpClient(opt);
    }); 

    var promise2 = new Promise (function (resolve) {
        var opt=appUtil.extend({},defualtCfg);
        // let types=req.body.types;
        opt.v = req.headers['v'];
        opt.authorization=req.headers['authorization'];//authorization
        opt.url+=`consultation/getCluesByConsultId?consultUnionId=${req.body.userUnionId}&types=${req.body.types}`;
        //opt.data=req.body;
        loger.info(opt.url);
        opt.callBack=function(error, response, body){
            if(error){
                res.send(error);
                resolve();
            }else {
                body = JSON.parse(body);
                loger.info(body);
                if (body.data) {
                    returnJSON.data.consultNum = body.data['1'];
                }
                resolve();
            }
        };
            httpClient(opt);
        }); 

    var promise3 = new Promise (function (resolve) {
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`triage/wxlist?status=${req.body.status}&customerName=${req.body.customerName}&consultUnId=${req.body.userUnionId}&sortord=0&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
        opt.v = req.headers['v'];
        opt.authorization=req.headers['authorization'];
       // opt.data=req.body;
        opt.url=encodeURI(opt.url);
        console.log( "url---------" + opt.url);
        opt.callBack=function(error, response, body){
            if(error){
                res.send(error);
                resolve();
            }else {
                body = JSON.parse(body);
                if (body.data) {
                    returnJSON.data.triageNum  = body.data.list.length;  
                }
                resolve();
            }
        };
        httpClient(opt);
    }); 


    Promise.all([promise1,promise2,promise3]).then(function (values) {
        console.log(returnJSON);
        res.send(returnJSON);
    })
}

module.exports = {
    userinfo: userinfo,
    usertoken:usertoken,
    tenantIdresources:tenantIdresources,
    userresources:userresources,
    test:test,
    totaltask:totaltask
}