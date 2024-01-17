const responseDataForm = require("../../config/responseDataForm");
const Member = require("../../model/Member");
const Variable = require("../../model/Variable");
const DB = require("../../config/dbTemplate");


// 랜덤으로 추천
const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    try{
        // 자신의 회원정보 불러오기.
        const foundMember = await Member.findOne({userId : getUserId}).exec();
        // 키워드 불러오기.
        const keywords = foundMember.interestKeywords;
        // console.log(keywords);
        const result = {};
        
        const variableDB = await Variable.findOne({tableId : 1}).exec();

        for(const key in DB.Post){
            // likeHit이 아님 수정.
            // keyword가 포함된 것들 중 랜덤하게 3개 찾기
            result[key] = await DB.Post[key].aggregate([{$match : {keywords : {$in : keywords}}}, {$sample : {size : variableDB.keywordVar}}]);
        }

        const responseData = responseDataForm("/", "recommentPosts get request complete", result);
        res.status(200).json({responseData});
    }catch(err){
        next(err);
    }
}

module.exports = {getMethod}