const Member = require("../../model/Member");
const jwt = require("jsonwebtoken");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    // 쿠키에서 refreshToken 가져오기
    const getCookies = req.cookies;
    if (!getCookies?.jwt) { // -> !cookies && !cookies.jwt
        return res.status(200).json({ "message": "쿠키에 refreshToken이 존재하지 않음" });
    }
    const getRefreshToken = getCookies.jwt;

    try {
        // DB 와 비교
        const foundUser = await Member.findOne({ refreshToken: getRefreshToken }).exec();
        if (!foundUser) {
            return res.status(403).json({ "message": "권한 없음 Forbidden" });
        }

        jwt.verify(
            // 1. 인증하려는 토큰
            getRefreshToken,
            // 2. refresh 토큰 생성할 때 썼던 암호키  
            process.env.REFRESH_TOKEN_SECRET,

            (err, decoded) => {
                // checking
                if (err || foundUser.userId != decoded.userId) {
                    return res.status(403).json({ "message": "권한 없음 Forbidden" });
                }

                // 새로운 accessToken 생성
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "userId": foundUser.userId,
                            "password": foundUser.password,
                            "userName": foundUser.userName,
                            "dateOfBirth": foundUser.dateOfBirth,
                            "email": foundUser.email,
                            "pet": foundUser.pet,
                            "interestKeywords": foundUser.interestKeywords
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "60s" }
                );

                const result = {};
                result.accessToken = accessToken;
                const responseData = responseDataForm(null, "logout get request complete", result);
                res.status(200).json({ responseData });
            }
        );
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod };