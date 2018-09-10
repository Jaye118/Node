var CONSTANT = require('../config/constant');
var httpClient = require('../utils/httpClient');
var appUtil = require('../utils/appUtils');
var loger = require('../utils/loger');
var defualtCfg = {
    url: CONSTANT.remoteHost + '/api/',
    contentType: 'application/json'
};



/**
 *   获取接口  api/users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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


module.exports = {
    totaltask: totaltask
}