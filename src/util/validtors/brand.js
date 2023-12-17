const { body ,query , param} = require('express-validator');
const validationResult = require('./validationResult');
const Brand = require('../../models/brand');
const slugify = require('slugify');

exports.getBrands = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
];

exports.getBrand = [
    param('brandId')
    .isMongoId().withMessage('The brandId is not valid'),

    validationResult
];

exports.postBrand = [
    body('title').trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:3}).withMessage('The title length should be greater than 3')
    .custom(async (val,{req}) => {
        let brand = await Brand.findOne({slug:slugify(val)});
        if (brand)
            return Promise.reject(new Error('The title is already used'));
        req.body.slug = slugify(val);
    }),

    body('image').trim()
    .notEmpty().withMessage('There is should be an imageUrl'),

    validationResult
];

exports.updateBrand = [
    body('title').optional().trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:5}).withMessage('The title length should be greater than 5')
    .custom(async (val,{req}) => {
        let brand = await Brand.findOne({slug:slugify(val)})
        if (brand) {
            return Promise.reject(new Error('The title is already used'));
        }
        req.body.slug = slugify(val);
    }),
    
    body('image').optional().trim()
    .notEmpty().withMessage('There is should be an imageUrl'),

    param('brandId').isMongoId().withMessage('The brandId is not valid'),
    
    validationResult
];


exports.deleteBrand = [
    param('brandId').isMongoId().withMessage('The brandId is not valid'),
    validationResult
];