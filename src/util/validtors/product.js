const { body , query , param } = require('express-validator');
const validationResult = require('./validationResult');

exports.getProducts = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
];

exports.getProduct = [
    param('productId')
    .isMongoId().withMessage('The productId is not valid'),

    validationResult
];

exports.postProduct = [
    body('title').trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:5}).withMessage('The title length should be greater than 5'),

    body('price')
    .notEmpty().withMessage('The price should not be empty')
    .isNumeric().withMessage('The price should be a number'),
    
    body('description').trim()
    .notEmpty().withMessage('The description should not be empty'),

    body('colorsQuantity')
    .isArray().withMessage('colors should be a array type with values like [colorName , quantity]'),

    validationResult
];


exports.updateProduct = [
    param('productId')
    .isMongoId().withMessage('The productId is not valid'),
    
    body('title').optional().trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:5}).withMessage('The title length should be greater than 5'),
    
    body('price').optional()
    .notEmpty().withMessage('The price should not be empty')
    .isNumeric().withMessage('The price should be a number'),
    
    body('description').optional().trim()
    .notEmpty().withMessage('The description should not be empty'),
    
    body('colorsQuantity').optional()
    .notEmpty().withMessage('The quantity should not be empty')
    .isNumeric().withMessage('The price should be a number'),
    
    validationResult
];

exports.deleteProduct = [
    param('productId')
    .isMongoId().withMessage('The productId is not valid'),
    
    validationResult
]


exports.getReviews = [
    param('productId')
    .isMongoId().withMessage('The productId is not valid'),
    
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
]