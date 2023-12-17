const express = require('express');
const router = express.Router();
const {getAddresses,deleteAddress,addAddress} = require('../controllers/address');
const {isAuth} = require('../middleware/isAuth');
const Validator= require('../util/validtors/address');

router.route('/')
    .get(isAuth,getAddresses)
    .post(isAuth,Validator.addAddress,addAddress)
    .delete(isAuth,Validator.deleteAddress,deleteAddress);

module.exports = router;