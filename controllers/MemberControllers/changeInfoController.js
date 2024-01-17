const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");
const Crawler = require("../../middleware/crawler");

const getMethod = async (req, res, next) => {
    const userId = req.userId;
    try {
        const foundUser = await Member.findOne({ userId: userId });
        if (!foundUser) {
            return res.status(401).json({ "message": "회원을 찾을 수 없음" });
        }

        const result = {
            userId: foundUser.userId,
            dateOfBirth: foundUser.dateOfBirth,
            email: foundUser.email,
            interestKeywords: foundUser.interestKeywords,
        }


        const responseData = responseDataForm(null, "changeInfo get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const putMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;
    const getInterestKeywords = req.body.interestKeywords;

    if (!getDateOfBirth || !getEmail || !getInterestKeywords) {
        return res.sendStatus(401).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.status(401).json({ "message": "회원을 찾을 수 없음" });
        }

        // findOne return 값 null임
        // 찾은 회원의 email이 getEmail과 다를 경우 실행
        // 같으면 중복을 확인할 필요가 없음.
        if (foundUser.email !== getEmail) {
            const duplicate = await Member.findOne({ email: getEmail }).exec();
            if (!!duplicate) {
                return res.status(401).json({ "message": "이메일 중복" });
            }
        }

        // keyword # 빼기
        const getNewInterestKeywords = getInterestKeywords.map((keyword) => {
            let strArray = [];
            if (keyword.indexOf('#') !== -1) {
                for (const one of keyword) {
                    if (one !== '#') strArray.push(one);
                }
            } else {
                strArray.push(keyword);
            }
            return strArray.join('');
        });


        const hashTag = '#';
        // 다시 # 붙이기 
        getNewInterestKeywords.forEach((keyword, index) => {
            getNewInterestKeywords[index] = hashTag.concat(keyword);
        })

        foundUser.dateOfBirth = getDateOfBirth;
        foundUser.email = getEmail;
        foundUser.interestKeywords = getNewInterestKeywords;
        await foundUser.save();

        const getKeyword = getNewInterestKeywords;
        let keywordSize = getKeyword.length;
        for (let i = 0; i < keywordSize; i++) {
            Crawler.naverNewsWithKeyword(1, getKeyword[i].replace(/#/g, ""));
            Crawler.youtubeNewsWithKeyword(getKeyword[i].replace(/#/g, ""));
        }

        const responseData = responseDataForm("/updatemem", "changeInfo put request complete", null);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}


module.exports = { getMethod, putMethod }