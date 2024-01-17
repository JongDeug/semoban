const express = require("express");
const router = express.Router();
const adminAdjustController = require("../../controllers/AdminControllers/adminAdjustController");

router.route('/adjust')
    .get(adminAdjustController.getMethod)
    .put(adminAdjustController.putMethod); 

module.exports = router;