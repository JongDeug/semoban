const Member = require("../../model/Member");
const bcrypt = require("bcryptjs");
const responseDataForm = require("../../config/responseDataForm");

const putMethod = async (req, res, next) => {
    // 유저 인증
    const getUserId = req.userId;
    const getPassword_exist = req.body.password_exist;
    const getPassword_change = req.body.password_change;

    if (!getPassword_exist || !getPassword_change) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.status(401).json({"message": "회원을 찾을 수 없음"});
        }

        // 기존 비밀번호 확인 
        // 비번 바꾸기, DB에도 바꾸기
        const match = await bcrypt.compare(getPassword_exist, foundUser.password);
        if (match) {
            // 6~16자리 영문, 숫자, 특수문자 조합
            const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}/;
            if (!regex.test(getPassword_change)) {
                return res.status(400).json({ "message": "패스워드(6-16) 영문, 숫자, 특수문자 조합이 아님" });
            }

            const hashedPwd = await new Promise((resolve, reject) => {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(getPassword_change, salt, (err, hash) => {
                        if (err) { reject(err); }
                        resolve(hash);
                    });
                });
            });

            if (!hashedPwd) {
                return res.status(401).json({"message" : "패스워드 해시 오류"});
            }
            foundUser.password = hashedPwd;
            await foundUser.save();

            const responseData = responseDataForm("/updatemem", "changePwd put request complete", null);
            res.status(200).json({ responseData });
        }
        else {
            res.status(401).json({"message" : "비밀번호 불일치"});
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { putMethod }