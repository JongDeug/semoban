const express = require('express');
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const postController = require("../../controllers/BoardControllers/postController");
const commentController = require("../../controllers/BoardControllers/commentController");
const likeHitController = require("../../controllers/BoardControllers/likeHitController");
const recommendPostsController = require("../../controllers/BoardControllers/recommendPostsController");
const Post = require('../../model/PostAnything');
const PostType = "boardAnything";
const Comment = require('../../model/CommentAnything');
const upload = require('../../middleware/upload');

router.route('/manage')
    .post(upload.array('attachedFile'), postController.postMethod(Post, PostType))
    .put(upload.array('attachedFile'), postController.putMethod(Post, PostType))
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), postController.deleteMethod(Post, Comment, PostType));

router.route('/comment/manage')
    .post(commentController.postMethod(Comment, PostType))
    .put(commentController.putMethod(Comment, PostType))
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), commentController.deleteMethod(Comment, PostType));

// router.route('/search')
    // .post(searchPostController.postMethod(Post));

router.route('/like/:postId')
    .get(likeHitController.getMethod(Post));


// search route를 밑으로 내려버리면 /search가 postId로 들어가면서 오류 발생시킴.
// router.route('/:postId/:method')
    // .get(postDetailController.getMethod(Post, Comment));

module.exports = router;