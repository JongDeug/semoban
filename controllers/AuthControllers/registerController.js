const Member = require("../../model/Member");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

const postMethod = async (req, res, next) => {
    const getUserId = req.body.userId;
    const getPassword = req.body.password;
    const getUserName = req.body.userName;
    const getDateOfBirth = req.body.dateOfBirth;
    const getEmail = req.body.email;
    const getInterestKeywords = req.body.interestKeywords;

    if (!getUserId || !getPassword || !getUserName || !getDateOfBirth || !getEmail || !getInterestKeywords) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    if(getInterestKeywords.length === 0){
        return res.status(400).json({"message" : "키워드 입력 필요"});
    }

    try {
        // 중복 체킹, id랑 email 중복 체킹
        const duplicateId = await Member.findOne({ userId: getUserId }).exec();
        const duplicateEmail = await Member.findOne({ email: getEmail }).exec();

        if (duplicateId) {
            return res.status(409).json({ "message": "아이디 중복" }) // conflict
        }

        if (duplicateEmail) {
            return res.status(409).json({ "message": "이메일 중복" }); // conflict
        }

        // 6~16자리 영문, 숫자, 특수문자 조합
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
        if (!regex.test(getPassword)) {
            return res.status(400).json({ "message": "패스워드(6-16) 영문, 숫자, 특수문자 조합이 아님" });
        }

        // password 암호화
        const hashedPwd = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(getPassword, salt, (err, hash) => {
                    if (err) { reject(err); }
                    resolve(hash);
                });
            });
        });

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


        // DB에 data저장
        const result = await Member.create({
            userId: getUserId,
            password: hashedPwd,
            userName: getUserName,
            dateOfBirth: getDateOfBirth,
            email: getEmail,
            interestKeywords: getNewInterestKeywords 
        });
        console.log(result);

        const responseData = responseDataForm("/login", `New user ${getUserId} created`, null)
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { postMethod };