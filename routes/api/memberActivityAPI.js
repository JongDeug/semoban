const express = require("express");
const router = express.Router();
const myPostController = require("../../controllers/MemberActivityControllers/myPostController");
const myCommentController = require("../../controllers/MemberActivityControllers/myCommentController");
const myLikePostController = require("../../controllers/MemberActivityControllers/myLikePostController");

router.get("/myPost", myPostController.getMethod);

router.get("/myComment", myCommentController.getMethod);

router.get("/myLikePost", myLikePostController.getMethod);

module.exports = router;