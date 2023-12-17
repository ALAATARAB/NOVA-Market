const couponService = require('../services/coupon');

exports.getCoupons = async (req,res,next) => {
    try {
        let {page,limit,prefix} = req.query;
        let coupons = await couponService.getCoupons(page,limit,prefix);
        res.status(200).json({message:"Here are the Coupons",coupons});
    }
    catch(err) {
        return next(err);
    }
}

exports.getCouponByTitle = async (req,res,next) => {
    try {
        let {title} = req.query;
        let coupon = await couponService.getCouponByTitle(title);
        if (Date.parse(coupon.expiresIn) < Date.now())
            res.status(404).json({message:'coupon is outdated'});
        else
            res.status(200).json({message:'getting coupon success',coupon});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateCoupon = async (req,res,next) => {
    try {
        let nCoupon = req.body;
        let {couponId} = req.params;
        let coupon = await couponService.updateCoupon(couponId,nCoupon);
        res.status(200).json({message:'coupon updated successfuly',coupon});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteCoupon = async (req,res,next) => {
    try {
        let {couponId} = req.params;
        await couponService.deleteCoupon(couponId);
        res.status(202).json({message:'coupon deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
}

exports.addCoupon = async (req,res,next) => {
    try {
        let nCoupon = req.body;
        let coupon = await couponService.insertCoupon(nCoupon);
        res.status(201).json({message:'coupon posted successfuly',coupon});
    }
    catch(err) {
        return next(err);
    }
}