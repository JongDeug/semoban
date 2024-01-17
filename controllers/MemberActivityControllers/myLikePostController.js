const responseDataForm = require("../../config/responseDataForm");
const DB = require("../../config/dbTemplate");

const getMethod = async (req, res, next) => {
    const getUserId = req.userId;
    const result = {};

    try {
        // 쿼리로 간단하게 구현가능.
        for (const key in DB.Post) {
            result[key] = await DB.Post[key].find({ likeHit: getUserId });
        }

        const responseData = responseDataForm(null, "myLikePost get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod }