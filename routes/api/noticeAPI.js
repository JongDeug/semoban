const express = require("express");
const router = express.Router();
const noticeController = require("../../controllers/NoticeControllers/noticeController");

router.route('/')
    .get(noticeController.getMethod)
    .delete(noticeController.deleteMethod);

module.exports = router;