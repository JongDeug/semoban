const Member = require("../../model/Member");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ROLES_LIST = require("../../config/roles_list");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getCookies = req.cookies;
    if (!getCookies?.jwt) { // !cookies && !cookies.jwt
        return res.sendStatus(200); // No content
    }
    const getRefreshToken = getCookies.jwt;

    try {
        const foundUser = await Member.findOne({ refreshToken: getRefreshToken }).exec();

        if (!foundUser) {
            res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.sendStatus(200);
        }

        // refreshToken db에서 지우기
        foundUser.refreshToken = "";
        const result = await foundUser.save();
        console.log(result);

        // jwt(refreshToken) client에서 지우기
        res.clearCookie("jwt", { httpOnly: true });

        const responseData = responseDataForm("/", "adminLogout get request complete", null);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}


const postMethod = async (req, res, next) => {
    const getUserId = req.body.userId;
    const getPassword = req.body.password;

    // front 에서 user, pwd 데이터 받아오기 
    if (!getUserId || !getPassword) {
        return res.status(400).json({ "message": "빠뜨린 입력 존재" });
    }

    try {
        // DB 확인
        const foundUser = await Member.findOne({ userId: getUserId }).exec();
        if (!foundUser) {
            return res.status(401).json({ "message": "회원 정보를 찾을 수 없음" });
        }

        // 관리자인지 아닌지 판별함.
        if (foundUser.roles.Admin !== ROLES_LIST.Admin) {
            return res.status(401).json({ "message": "admin 계정이 아님" });
        }

        // 데이터베이스에 있는 비밀번호와 사용자 입력 비밀번호 체킹
        const match = await bcrypt.compare(getPassword, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles);
            // accessToken 생성
            const accessToken = jwt.sign(
                // 1. 넣을 정보
                {
                    "UserInfo": {
                        "userId": foundUser.userId,
                        "roles": roles
                    },
                },

                // 2. .env 파일, accessToken을 만들기 위해 처음 필요한 또다른 암호 코드
                process.env.ACCESS_TOKEN_SECRET,

                // 3. 시간
                { expiresIn: "1h" }
            );

            // refreshToken 생성
            const refreshToken = jwt.sign(
                { "userId": foundUser.userId },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            )

            // refreshToken DB에 저장
            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            // refreshToken front-end cookie에 저장. 그래야 DB랑 cookie랑 비교 가능.
            res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // httpOnly는 javascript로 접근 불가능.


            const result = {};
            result.accessToken = accessToken;
            // result.host = getUserId;
            const responseData = responseDataForm("/", "adminLogin post request complete", result);

            res.status(200).json({ responseData });
        }
        else {
            res.status(401).json({ "message": "아이디 혹은 비밀번호 불일치" });
        }
    } catch (err) {
        next(err);
    }

}

module.exports = { postMethod, getMethod };