const { body , query, param } = require('express-validator');
const validationResult = require('./validationResult');
const Coupon = require('../../models/coupon');

exports.getCoupons = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
];

exports.insertCoupon = [
    body('title').trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:6}).withMessage('the length should be greater than 6')
    .custom(async (val) => {
        let coupon = await Coupon.findOne({title:val})
        if (coupon) 
            return Promise.reject(new Error('The title is already used'));
    }),

    body('discount')
    .notEmpty().withMessage('The discount should not be empty')
    .isNumeric().withMessage('The discount should be a number')
    .custom(async (val) => {
        if (Number(val) < 1 || Number(val) > 99) {
            return Promise.reject(new Error('The discount should ba in range 1-99'));
        }
        
    }),

    body('expiresIn')
    .isDate().withMessage('The expiresIn should be Date')
    .custom(async (val) => {
        if (Date.parse(val) <= Date.now()) {
            return Promise.reject(new Error('The expiresIn is already outdated'));
        }
        
    }),

    validationResult
];

exports.updateCoupon = [
    param('couponId')
    .isMongoId().withMessage('The couponId is not valid'),
    
    body('title').optional().trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:6}).withMessage('the length should be greater than 6')
    .custom(async (val) => {
        let coupon = await Coupon.findOne({title:val})
        if (coupon)
            return Promise.reject(new Error('The title is already used'));
    }),
    
    body('discount').optional()
    .notEmpty().withMessage('The discount should not be empty')
    .isNumeric().withMessage('The discount should be a number')
    .custom(async (val) => {
        if (Number(val) < 1 || Number(val) > 99) {
            return Promise.reject(new Error('The discount should ba in range 1-99'));
        }
        
    }),

    body('expiresIn').optional()
    .isDate().withMessage('The expiresIn should be Date')
    .custom(async (val) => {
        if (Date.parse(val) <= Date.now()) {
            return Promise.reject(new Error('The expiresIn is already outdated'));
        }
        
    }),

    validationResult
];

exports.deleteCoupon = [
    param('couponId')
    .isMongoId().withMessage('The couponId is not valid'),

    validationResult
]