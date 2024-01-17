const express = require("express");
const router = express.Router();

const articleNewsListController = require("../controllers/NewsControllers/articleNewsListController");
const articleNewsDetailController = require("../controllers/NewsControllers/articleNewsDetailController");
const videoNewsController = require("../controllers/NewsControllers/videoNewsController");
const videoNewsDetailController = require("../controllers/NewsControllers/videoNewsDetailController");

router.route("/article").get(articleNewsListController.getMethod);
router.route("/article/:newsId").get(articleNewsDetailController.getMethod);
router.route("/video").get(videoNewsController.getMethod);
router.route("/video/:videoNewsId").get(videoNewsDetailController.getMethod);

module.exports = router;
