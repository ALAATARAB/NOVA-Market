const { body , param , query } = require('express-validator');
const validationResult = require('./validationResult');
const User = require('../../models/user');
const Product = require('../../models/product');

exports.getCart = [
    param('cartId').optional()
    .isMongoId().withMessage('The CartId is not valid')
    .custom( async (val,{req}) => {
        let user = await User.findById(req.userId)
        if (user.cart != val)
            return Promise.reject(new Error('You are not the owner of the cart *_*!!'));
    }),
    validationResult
];

exports.applyCoupon = [
    param('cartId')
    .isMongoId().withMessage('The CartId is not valid')
    .custom( async (val,{req}) => {
        let user = await User.findById(req.userId);
            if (user.cart != val)
                return Promise.reject(new Error('You are not the owner of the cart *_*!!'));
    }),
    
    query('couponTitle').trim()
    .notEmpty().withMessage('The coupon title should not be empty'),

    validationResult
];


exports.addToCart = [
    param('cartId')
    .isMongoId().withMessage('The CartId is not valid')
    .custom( async (val,{req}) => {
        let user =await User.findById(req.userId)
        
        if (user.cart != val)
            return Promise.reject(new Error('You are not the owner of the cart *_*!!'))
    }),
    body('color')
    .isHexColor().withMessage('The color is invalid'),
    
    body('quantity')
    .isNumeric().withMessage('The quantity should be number'),

    body('productId')
    .isMongoId().withMessage('The productId is invalid')
    .custom( async (val,{req}) => {
        let {quantity,color} = req.body;
        let product = await Product.findById(val);
        if (!product)
            return Promise.reject(new Error('There is no product like that *_*'));

        if (!product.colorsQuantity.get(color)) 
            return Promise.reject(new Error('There is no color like that for this product *_*'));

        if (product.colorsQuantity.get(color) < quantity) 
            return Promise.reject(new Error('There is no enough quantity for this color'));
    }),

    validationResult
];

exports.updateCart = [
    param('cartId')
    .isMongoId().withMessage('The CartId is not valid')
    .custom( async (val,{req}) => {
        let user = await User.findById(req.userId)
        if (user.cart != val)
            return Promise.reject(new Error('You are not the owner of the cart *_*!!'))
    }),
    
    body('color')
    .isHexColor().withMessage('The color is invalid'),

    body('quantity')
    .isNumeric().withMessage('The quantity should be number'),

    body('productId')
    .isMongoId().withMessage('The productId is invalid')
    .custom( async (val,{req}) => {
        let {quantity,color} = req.body;
        let product = await Product.findById(val);
            if (!product)
                return Promise.reject(new Error('There is no product like that *_*'));

            if (!product.colorsQuantity.get(color)) 
                return Promise.reject(new Error('There is no color like that for this product *_*'));

            if (product.colorsQuantity.get(color) < quantity) 
                return Promise.reject(new Error('There is no enough quantity for this color'));
    }),

    validationResult
];


exports.clearCart = [
    param('cartId').isMongoId().withMessage('The cartId is invalid')
    .custom( async (val,{req}) => {
        let user = await User.findById(req.userId)
        if (user.cart != val)
            return Promise.reject(new Error('You are not the owner of the cart *_*!!'));
    }),
    validationResult
]