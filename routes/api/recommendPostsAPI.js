const express = require("express");
const router = express.Router();
const recommendPostsController = require("../../controllers/BoardControllers/recommendPostsController");

router.route('/')
    .get(recommendPostsController.getMethod);

module.exports = router;