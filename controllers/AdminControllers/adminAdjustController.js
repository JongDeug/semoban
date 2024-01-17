const Variable = require("../../model/Variable");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getRoles = req.roles;
    try {
        if (!getRoles.includes(5000)) {
            return res.status(400).json({ "message": "admin 계정이 아님" });
        }

        const result = await Variable.findOne({ tableId: 1 });
        const responseData = responseDataForm(null, "adminAdjust get request complete", result);
        res.status(200).json({ responseData })
    } catch (err) {
        next(err);
    }
}

const putMethod = async (req, res, next) => {
    const getLikeVar = req.body.likeVar;
    const getLikePage = req.body.likePage;
    const getKeywordVar = req.body.keywordVar;
    const getNewsVar = req.body.newsVar;
    const getRoles = req.roles;

    try {
        if (!getLikeVar || !getKeywordVar || !getNewsVar) {
            return res.status(401).json({ "message": "빠뜨린 입력 존재" });
        }

        if (!getRoles.includes(5000)) {
            return res.status(400).json({ "message": "admin 계정이 아님" });
        }

        const result = await Variable.findOne({ tableId: 1 });
        result.likeVar = getLikeVar;
        result.likePage = getLikePage;
        result.keywordVar = getKeywordVar;
        result.newsVar = getNewsVar;
        await result.save();

        console.log(result);

        const responseData = responseDataForm("/variablecontrol", "adminAdjust post request complete", null);
        res.status(200).json({ responseData });

    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod, putMethod }
