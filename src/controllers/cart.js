const cartServices = require('../services/cart');
const couponServices = require('../services/coupon');

exports.getCart = async (req,res,next) => {
    try {
        let userId = req.userId;
        let {cartId} = req.params;
        let cart = await cartServices.getCart(userId,cartId);
        res.status(200).json({message:'getting cart successfully',cart});
    }
    catch(err) {
        return next(err);
    }
}

exports.addToCart = async (req,res,next) => {
    try {
        let {cartId} = req.params;
        let {productId,color,quantity} = req.body;
        let cart = await cartServices.addToCart(cartId,productId,color,quantity);
        res.status(201).json({message:'adding to cart successfully',cart});
    }
    catch(err) {
        return next(err);
    }
}

exports.clearCart = async (req,res,next) => {
    try {
        let {cartId} = req.params;
        await cartServices.clearCart(cartId);
        res.status(202).json({message:'cart cleared successfully'});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateCart = async (req,res,next) => {
    try {
        let {cartId} = req.params;
        let {productId,color,quantity} = req.body;
        let cart = await cartServices.updateCart(cartId,productId,color,quantity);
        res.status(200).json({message:'adding to cart successfully',cart});
    }
    catch(err) {
        return next(err);
    }
}

exports.applyCoupon = async (req,res,next) => {
    try {
        let {cartId} = req.params;
        let {couponTitle} = req.query;
        let coupon = await couponServices.getCouponByTitle(couponTitle);
        let cart = await cartServices.applyCoupon(cartId,coupon);
        res.status(200).json({message:'coupon applied successfuly',cart});
    }
    catch(err) {
        return next(err);
    }
}