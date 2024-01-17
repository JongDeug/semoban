const express = require("express");
const router = express.Router();
const popularityPostsController = require("../controllers/BoardControllers/popularityPostsController");

router.get("/", popularityPostsController.getMethod);

module.exports = router;