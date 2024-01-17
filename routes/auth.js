const express = require('express');
const router = express.Router();
const registerController = require('../controllers/AuthControllers/registerController');
const loginController = require('../controllers/AuthControllers/loginController');
const logoutController = require('../controllers/AuthControllers/logoutController');
const refreshTokenController = require('../controllers/AuthControllers/refreshTokenController')
const findIdController = require('../controllers/AuthControllers/findIdController');
const findPwdController = require('../controllers/AuthControllers/findPwdController');

router.route('/register')
    .post(registerController.postMethod);

router.route('/login')
    .post(loginController.postMethod);

router.route('/logout')
    .get(logoutController.getMethod);

router.route('/refresh')
    .get(refreshTokenController.getMethod);

router.route('/findId')
    .post(findIdController.postMethod)

router.route('/findPwd')
    .post(findPwdController.postMethod)

module.exports = router;