const express = require('express');
const router = express.Router();
const {getCouponByTitle,deleteCoupon,getCoupons,updateCoupon,addCoupon} = require('../controllers/coupon');
const {isAuth} = require('../middleware/isAuth');
const {isAdmin} = require('../middleware/isAdmin');
const Validator = require('../util/validtors/coupon');

router.get('/title',isAuth,getCouponByTitle);

router.route('/')
    .get(isAdmin,Validator.getCoupons,getCoupons)
    .post(isAdmin,Validator.insertCoupon,addCoupon);

router.route('/:couponId')
    .put(isAdmin,Validator.updateCoupon,updateCoupon)
    .delete(isAdmin,Validator.deleteCoupon,deleteCoupon);

module.exports = router;