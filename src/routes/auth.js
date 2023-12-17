const express = require('express');
const router = express.Router();
const {logIn,signUp,forgetPassword,resetPassword,verfiyResetCode} = require('../controllers/auth');
const Validator = require('../util/validtors/auth');
const {isAuth} = require('../middleware/isAuth');

router.post('/signup',Validator.signUp,signUp);

router.post('/login',Validator.logIn,logIn);

router.post('/forget-password',Validator.forgetPassword,forgetPassword);

router.post('/verfiy-reset-code',Validator.verfiyResetCode,verfiyResetCode);

router.post('/reset-password',Validator.resetPassword,resetPassword);

module.exports = router;