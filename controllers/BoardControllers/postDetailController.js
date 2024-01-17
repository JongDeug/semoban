const responseDataForm = require("../../config/responseDataForm");
// const _ = require("lodash");

const getMethod = (Post, Comment) => {
    return async (req, res, next) => {
        const getUserId = req.userId;
        const getPostId = req.params.postId;
        const getMethod = req.params.method;

        if (!getPostId || !getMethod) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        try {
            // DB에서 읽어오는데 Post, Comment 둘다 읽어와야함.
            const foundPost = await Post.findById(getPostId).exec();
            const foundComments = await Comment.find({ postId: getPostId }).exec();

            // 조회수 up
            if (getMethod === "put") {
                foundPost.hit -= 1;
            } else {
                foundPost.hit += 1;
            }

            const resultPost = await foundPost.save();
            const result = resultPost.toObject();

            // host 이름(비교 하려고, 수정, 삭제), 댓글들 주기
            if (!getUserId) {
                result.host = "Non-Member";
            } else {
                result.host = getUserId;
            }
            result.comments = foundComments;

            // likeHit 유무 확인 코드
            if (result.likeHit.includes(getUserId)) {
                result.likeHitBool = true;
            } else {
                result.likeHitBool = false;
            }

            const responseData = responseDataForm(null, "readPostDetail get request complete", result);
            res.status(200).json({ responseData });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = { getMethod };