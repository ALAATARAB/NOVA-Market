const { body , query , param } = require('express-validator');
const validationResult = require('./validationResult');
const Cart = require('../../models/cart');
const Product = require('../../models/product');

exports.getOrders = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
];

exports.getOrder = [
    param('orderId')
    .isMongoId().withMessage('The orderId is not valid'),

    validationResult
];

exports.postOrder = [
    body('cartId')
    .isMongoId().withMessage('The cartId is not valid')
    .custom( async (val,{req}) => {
        let cart = await Cart.findById(val)
        if (!cart)
            return Promise.reject(new Error("There is no Cart like that"));
        if (!cart.totalPrice)
            return Promise.reject(new Error("There is no items in the cart"));
        for (const item of cart.items) {
            let {product : productId , quantity , color} = item;
            let product = await Product.findById(productId)
            if (product.colorsQuantity.get(color) < quantity)
                return Promise.reject(new Error(`The avalible quantity for : ${productId} is ${product.colorsQuantity.get(color)}`));
        }

        req.order = {
            items:cart.items,
            totalPrice:cart.totalPrice,
            discountRate:cart.discountRate
        };
    }),

    body('shippingAddress')
    .notEmpty().withMessage('The shippingAddress should not be empty')
    .custom( async (val,{req}) => {
        if (!val.city || !val.details || !val.phone)
            return Promise.reject(new Error('There is something missing with shipping address details'));
        if(req.order)
        req.order.shippingAddress = val; 
    }),

    body('paymentMethod')
    .notEmpty().withMessage('The payment method should not be empty')
    .custom( async (val,{req}) => {
        if (val !== 'cash' && val !== 'card')
            return Promise.reject(new Error('The payment method is invalid'));
        if(req.order)
            req.order.paymentMethod = val;
    }),

    validationResult
];


exports.updateOrder = [
    param('orderId')
    .isMongoId().withMessage('The orderId is not valid'),
    
    body('paidAt').optional()
    .isDate().withMessage('The paid at should be date'),
    
    body('deliveredAt').optional()
    .isDate().withMessage('The delivered at should be date'),

    validationResult
];

exports.deleteOrder = [
    param('orderId')
    .isMongoId().withMessage('The orderId is not valid'),

    validationResult
]