const express = require('express');
const router = express.Router();
const adminAuthController = require("../controllers/AdminControllers/adminAuthController");

router.route('/login')
    .post(adminAuthController.postMethod);

router.route('/logout')
    .get(adminAuthController.getMethod);

module.exports = router;