const express = require('express');
const router = express.Router();
const {getCart,addToCart,updateCart,clearCart,applyCoupon} = require('../controllers/cart');
const {isAuth} = require('../middleware/isAuth');
const Validator = require('../util/validtors/cart');

router.post('/apply-coupon/:cartId',isAuth,Validator.applyCoupon,applyCoupon);

router.get('/',isAuth,getCart)

router.route('/:cartId').
    get(isAuth,Validator.getCart,getCart).
    post(isAuth,Validator.addToCart,addToCart).
    put(isAuth,Validator.updateCart,updateCart).
    delete(isAuth,Validator.clearCart,clearCart);

module.exports = router;