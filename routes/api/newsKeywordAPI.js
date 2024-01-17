const express = require("express");
const router = express.Router();

const articleKeywordNewsListController = require("../../controllers/NewsControllers/articleNewsListWithKeywordController");
const videoKeywordNewsListController = require("../../controllers/NewsControllers/videoNewsListWithKeywordController");

router.route("/articleKeyword").get(articleKeywordNewsListController.getMethod);
router.route("/videoKeyword").get(videoKeywordNewsListController.getMethod);

module.exports = router;
