const Member = require("../../model/Member");
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

        const responseData = responseDataForm("/", "logout get request complete", null);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }