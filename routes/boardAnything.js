const express = require('express');
const router = express.Router();
const postController = require("../controllers/BoardControllers/postController");
const searchPostController = require("../controllers/BoardControllers/searchPostController");
const postDetailController = require("../controllers/BoardControllers/postDetailController");
const verifyJWTWirter = require("../middleware/verifyJWTWirter");
const Post = require('../model/PostAnything');
const Comment = require('../model/CommentAnything');

router.get("/read", postController.getMethod(Post, Comment));
router.post("/search", searchPostController.postMethod(Post));
router.get("/:postId/:method", verifyJWTWirter, postDetailController.getMethod(Post, Comment));


module.exports = router;