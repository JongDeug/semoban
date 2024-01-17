const responseDataForm = require("../../config/responseDataForm");
const fs = require('fs');

const getMethod = (Post, Comment) => {
    return async (req, res, next) => {
        try {
            const resultPost = await Post.find({});
            const result = [];


            for (let post of resultPost) {
                // postId로 Comment의 개수 구하기
                const commentCount = await Comment.find({ postId: post._id }).count();
                // Document를 Object로 변환
                post = post.toObject();
                post.commentCount = commentCount;
                result.push(post);
            }
            const responseData = responseDataForm(null, "board get request complete", result);
            res.status(200).json({ responseData });
        } catch (err) {
            next(err);
        }
    }
}


const postMethod = (Post, PostType) => {
    return async (req, res, next) => {
        // 값 받기 
        const getUserId = req.userId;
        const getPostTitle = JSON.parse(req.body.postTitle);
        const getPostContent = JSON.parse(req.body.postContent);
        const getKeywords = JSON.parse(req.body.keywords);
        const getAttachedFile = req.files.map(file => file.path);

        if (!getPostTitle || !getPostContent || !getKeywords) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        // DB에 저장 
        try {
            // keyword # 제거
            const getNewKeywords = getKeywords.map((keyword) => {
                let strArray = [];
                if (keyword.indexOf('#') !== -1) {
                    for (const one of keyword) {
                        if (one !== '#') strArray.push(one);
                    }
                } else {
                    strArray.push(keyword);
                }
                return strArray.join('');
            });

            // 다시 # 태그 붙이기
            const hashTag = '#';
            getNewKeywords.forEach((keyword, index) => {
                getNewKeywords[index] = hashTag.concat(keyword);
            })


            const result = await Post.create({
                userId: getUserId,
                postTitle: getPostTitle,
                postContent: getPostContent,
                keywords: getNewKeywords,
                attachedFile: getAttachedFile
            });
            // console.log(`result : ${result}`);

            const responseData = responseDataForm(`/post/${PostType}/${result._id}`, "board post request complete", result);
            res.status(200).json({ responseData });
        } catch (err) {
            next(err);
        }
    }
}


const putMethod = (Post, PostType) => {
    return async (req, res, next) => {
        // 값 받기
        const getUserId = req.userId;
        // multipart/form-data로 받기 위해서는 json springify -> paser해서 내가 받아줘야함.
        const getPostId = JSON.parse(req.body.postId);
        const getPostTitle = JSON.parse(req.body.postTitle);
        const getPostContent = JSON.parse(req.body.postContent);
        const getKeywords = JSON.parse(req.body.keywords);
        const getAttachedFile = req.files.map(file => file.path);

        if (!getPostId || !getPostTitle || !getPostContent || !getKeywords) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        try {
            // 게시물 찾고 
            const foundPost = await Post.findById(getPostId).exec();

            // 작성자, 권한 확인하기
            if (foundPost.userId === getUserId || req.allowed) {
                // 수정
                foundPost.postTitle = getPostTitle;
                foundPost.postContent = getPostContent;
                foundPost.keywords = getKeywords;
                foundPost.attachedFile = getAttachedFile;

                // 작성 일자에서 수정한 시간으로 바꿀까?
                const result = await foundPost.save();
                // console.log(result);

                const responseData = responseDataForm(`/post/${PostType}/${result._id}`, "board put request complete", result);
                res.status(200).json({ responseData });
            } else {
                res.status(401).json({ message: "권한 없음" });
            }

        } catch (err) {
            next(err);
        }
    }
}


const deleteMethod = (Post, Comment, PostType) => {
    return async (req, res, next) => {
        // 값 받기
        const getUserId = req.userId;
        const getPostId = req.body.postId;

        if (!getPostId) {
            return res.status(400).json({ "message": "빠뜨린 입력 존재" });
        }

        try {
            const foundPost = await Post.findById(getPostId).exec();

            // 작성자, 권한 확인
            if (foundPost.userId === getUserId || req.allowed) {

                // upload 파일 지우기
                foundPost.attachedFile.map((name) => {
                    console.log(name);
                    fs.unlink(`${name}`, (err) => {
                        console.log(err);
                    });
                })

                // 삭제
                const postResult = await Post.deleteOne({ _id: getPostId });
                console.log(postResult);
                const commentResults = await Comment.deleteMany({ postId: getPostId });
                console.log(commentResults);

                // 종류에 따라 redirect 선택
                let redirect;
                if (PostType === "boardInformation") {
                    redirect = "/board/info";
                } else if (PostType === "boardAnything") {
                    redirect = "/board/free";
                } else if (PostType === "boardQuestion") {
                    redirect = "/board/question";
                } else if (PostType === "boardBoast") {
                    redirect = "/board/boast";
                }
                const responseData = responseDataForm(redirect, "board delete request complete", null);
                res.status(200).json({ responseData });
            }
            else {
                res.status(401).json({ "message": "권한 없음" });
            }
        } catch (err) {
            next(err);
        }
    }
}


module.exports = { getMethod, postMethod, putMethod, deleteMethod }