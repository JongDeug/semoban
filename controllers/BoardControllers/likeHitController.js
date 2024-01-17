const responseDataForm = require("../../config/responseDataForm");

const getMethod = (Post) => {
    return async (req, res, next) => {
        const getUserId = req.userId;
        const getPostId = req.params.postId;

        if (!getPostId) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        try {
            // DB 검색
            const result = await Post.findById(getPostId).exec();

            // likeHit 배열에 userId 넣기
            // likeHit에 userId가 없으면 추가
            if (!result.likeHit.includes(getUserId)) {
                result.likeHit.push(getUserId);
                result.likeHitBool = true;
                result.save();
            } else { // userId가 있으면 없에기.
                result.likeHit = result.likeHit.filter((user) => user !== getUserId);
                result.likeHitBool = false;
                result.save();
            }

            const responseData = responseDataForm(null, "likeHit get request complete", result);
            res.status(200).json({ responseData });

        } catch (err) {
            next(err);
        }
    }
}
module.exports = { getMethod };