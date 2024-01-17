const express = require('express');
const router = express.Router();
const leaveIdController = require('../../controllers/MemberControllers/leaveIdController');
const changePwdController = require('../../controllers/MemberControllers/changePwdController');
const changeInfoController = require('../../controllers/MemberControllers/changeInfoController');

router.route('/leaveId')
    .delete(leaveIdController.deleteMethod);

router.route('/changePwd')
    .put(changePwdController.putMethod);

router.route('/changeInfo')
    .get(changeInfoController.getMethod)
    .put(changeInfoController.putMethod);



module.exports = router;