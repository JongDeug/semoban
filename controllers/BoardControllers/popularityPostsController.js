const responseDataForm = require("../../config/responseDataForm");
const DB = require("../../config/dbTemplate");
const Variable = require("../../model/Variable");
const moment = require('moment-timezone');

const getMethod = async (req, res, next) => {

    try {
        const variableDB = await Variable.findOne({ tableId: 1 });
        const result = {};

        // 일주일 안의 데이터만 가져와야 해서 일주일 전 date를 get
        moment.tz.setDefault('Asia/Seuol');
        const subtractDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
        // console.log(subtractDate);

        for (const key in DB.Post) {
            // 좋아요 수가 ?개보다 같거나 큼, 내림차순으로 정렬, limit 2개
            // result[key] = await DB.Post[key].aggregate().addFields({ "likeHitLength": { "$size": "$likeHit" } }).match( }).sort().limit(variableDB.likePage);
            result[key] = await DB.Post[key].aggregate([
                { "$addFields": { "likeHitLength": { "$size": "$likeHit" } } },
                // mongodb는 string 으로 date 비교가 가능함!!
                { "$match": { "likeHitLength": { "$gte": variableDB.likeVar }, "postTime" : {"$gt" : subtractDate}} },
                { "$sort": { "likeHitLength": -1 } },
                { "$sample": { "size": variableDB.likePage } }
            ]);
            console.log(result[key]);
        }

        const responseData = responseDataForm(null, "popularity get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }