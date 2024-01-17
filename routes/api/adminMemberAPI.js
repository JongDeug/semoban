const express = require("express");
const router = express.Router();
const adminMemberListController = require("../../controllers/AdminControllers/adminMemberListController");
const adminMemberDetailController = require("../../controllers/AdminControllers/adminMemberDetailController");

router.route('/manage')
    .get(adminMemberListController.getMethod)

router.route('/manage/:memberId')
    .get(adminMemberDetailController.getMethod)
    .delete(adminMemberDetailController.deleteMethod)
    
module.exports = router;