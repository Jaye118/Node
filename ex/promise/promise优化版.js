var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var loger=require('../utils/loger');
var defualtCfg={
    url:CONSTANT.remoteHost+'/api/',
    contentType:'application/json'
};


function totaltask(req, res, next) {
    // 
    let cluelistNumUrl = `clue/pageList?userUnionId=${req.body.userUnionId}&group=${req.body.group}&searchName=${encodeURI(req.body.searchName)}&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
    let pcluelistNum = wxaPromise(req, cluelistNumUrl).then(result => {
        let countResult = -1;
        if (result.code == 0) {
            countResult = result.data.count;
        }
        return countResult;
    });
    // 
    let consultNumUrl = `consultation/getCluesByConsultId?consultUnionId=${req.body.userUnionId}&types=${req.body.types}`;
    let pconsultNu = wxaPromise(req, consultNumUrl).then(result => {
        let countResult = -1;
        if (result.code == 0) {
            countResult = result.data['1'];
        }
        return countResult;
    });
    // 
    let triageNumUrl = `triage/wxlist?status=${req.body.status}&customerName=${req.body.customerName}&consultUnId=${req.body.userUnionId}&sortord=0&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
    let ptriageNum = wxaPromise(req, triageNumUrl).then(result => {
        let countResult = -1;
        if (result.code == 0) {
            countResult = result.data.count;
        }
        return countResult;
    });
    // 
    let localNumUrl = `clue/pageList?userUnionId=${req.body.userUnionId}&group=${req.body.grouplocal}&searchName=${encodeURI(req.body.searchName)}&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
    let plocalNum = wxaPromise(req, localNumUrl).then(result => {
        let countResult = -1;
        if (result.code == 0) {
            countResult = result.data.count;
        }
        return countResult;
    });
    // 
    let waitNumUrl = `mediaBase/pagelist?unionId=${req.body.userUnionId}&busStatus=${req.body.busStatus}&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
    let pwaitNum = wxaPromise(req, waitNumUrl).then(result => {
        let countResult = -1;
        if (result.code == 0) {
            countResult = result.data.count;
        }
        return countResult;
    });
    // 
    let operateNumUrl = `newArrivals/newArrivalsList?userUnId=${req.body.userUnionId}`;
    let poperateNum = wxaPromise(req, operateNumUrl).then(result => {
        let countResult = -1;
        if (result.code == 0) {
            countResult = result.data.length;
        }
        return countResult;
    });

    Promise.all([pcluelistNum, pconsultNu, ptriageNum, plocalNum, pwaitNum, poperateNum]).then(aResult => {
        loger.info("red count result---------",aResult);
        let returnJSON = {
            "code": "0",
            "msg": "成功",
            "data": {
                "cluelistNum": aResult[0],
                "consultNum": aResult[1],
                "triageNum": aResult[2],
                "localNum": aResult[3],
                "waitNum": aResult[4],
                "operateNum": aResult[5]
            }
        };
         res.send(returnJSON);
    })
}

function wxaPromise(req, url) {
    return new Promise(function (resolve) {
        defualtCfg.method = "GET";
        var opt = appUtil.extend({}, defualtCfg);
        opt.url += url;
        opt.v = req.headers['v'];
        opt.authorization = req.headers['authorization']; //authorization
        loger.info(opt.url);
        opt.url = encodeURI(opt.url);
        opt.callBack = function (error, response, body) {
            if (error) {
                loger.error(error);
                resolve(error);
            } else {
                body = JSON.parse(body);
                resolve(body);
            }
        };
        httpClient(opt);
    });
}

module.exports = {
    totaltask:totaltask
}