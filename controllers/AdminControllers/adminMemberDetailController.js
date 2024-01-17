const Member = require("../../model/Member");
const responseDataForm = require("../../config/responseDataForm");
const DB = require("../../config/dbTemplate");
const { default: mongoose } = require("mongoose");

const getMethod = async (req, res, next) => {
    const getMemberId = req.params.memberId;
    const getRoles = req.roles;
    try {
        if (!getMemberId) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        if (!getRoles.includes(5000)) {
            return res.status(400).json({ "message": "admin 계정이 아님" });
        }
        const result = await Member.findById(getMemberId);

        const responseData = responseDataForm(null, "adminMember delete request complete", result);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

const deleteMethod = async (req, res, next) => {
    const getMemberId = req.params.memberId;
    const getRoles = req.roles;

    try {
        if (!getMemberId) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        if (!getRoles.includes(5000)) {
            return res.status(400).json({ "message": "admin 계정이 아님" });
        }
        
        // const foundUser = await Member.findByIdAndDelete(getMemberId);
        const foundUser = await Member.findById(getMemberId).exec();
        if (!foundUser) {
            return res.status(401).json({ "message": "회원을 찾을 수 없음" });
        }

        for (const key in DB.Post) {
            // 자신의 post 찾기
            const foundPost = await DB.Post[key].find({ userId: foundUser.userId });
            console.log("post", foundPost);

            for (const post of foundPost) {
                // postId를 통해 내 포스터의 모든 댓글 삭제
                const deleteComment = await DB.Comment[key].deleteMany({ postId: post._id });
                console.log(deleteComment);
            }
        }

        // 내 게시글, 댓글 삭제
        for (const key in DB.Post) {
            const resultPost = await DB.Post[key].deleteMany({ userId: foundUser.userId });
            const resultComment = await DB.Comment[key].deleteMany({ userId: foundUser.userId });
            console.log(resultPost);
            console.log(resultComment);
        }

        // 회원 삭제
        const resultMember = await Member.deleteOne({ userId: foundUser.userId });
        console.log(resultMember);

        const responseData = responseDataForm("/memberlist", "adminMember delete request complete", null);
        res.status(200).json({ responseData });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMethod, deleteMethod }