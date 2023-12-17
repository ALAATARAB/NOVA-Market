const Coupon = require('../models/coupon');
const Factory = require('./Factory');

// for user
exports.getCouponByTitle = async (title) => {return await Factory.getOneByQuery(Coupon,[{title}]);}

// for admins
exports.getCoupons = async (page,limit,prefix) => {return await Factory.getAll(Coupon,page,limit,'',prefix);}

exports.insertCoupon = async (coupon) => {return await Factory.createOne(Coupon,coupon);}

exports.updateCoupon = async (couponId,coupon) => {return await Factory.updateOne(Coupon,couponId,coupon);}

exports.deleteCoupon = async (couponId) => {return await Factory.deleteOne(Coupon,couponId);}