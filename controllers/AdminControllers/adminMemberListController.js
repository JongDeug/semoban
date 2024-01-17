const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");

const getMethod = async (req, res, next) => {
    const getRoles = req.roles;
    try {
        if (!getRoles.includes(5000)) {
            return res.status(400).json({ "message": "admin 계정이 아님" });
        }

        // 모든 Member 주기 
        const result = await Member.aggregate([
            { $match: { "roles.Admin": { "$ne": 5000 } } }, // admin 빼고 주기
            { $project: { "userId": 1, "userName": 1, "dateOfBirth": 1, "email": 1, "interestKeywords": 1 } }
        ]);

        const responseData = responseDataForm(null, "adminMember get request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}



module.exports = { getMethod }