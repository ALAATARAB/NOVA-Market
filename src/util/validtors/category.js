const { body ,query , param} = require('express-validator');
const validationResult = require('./validationResult');
const Category = require('../../models/category');
const slugify = require('slugify');


exports.getCategories = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
];

exports.getCategory = [
    param('categoryId')
    .isMongoId().withMessage('The categoryId is not valid'),

    validationResult
];

exports.postCategory = [
    body('title').trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:3}).withMessage('The title length should be greater than 3')
    .custom(async (val,{req}) => {
        let category = await Category.findOne({slug:slugify(val)})
        if (category)
            return Promise.reject(new Error('The title is already used'));

        req.body.slug = slugify(val);
    }),

    body('image').trim()
    .notEmpty().withMessage('There is should be an imageUrl'),

    validationResult
];

exports.updateCategory = [
    param('categoryId').isMongoId().withMessage('The categoryId is not valid'),
    
    body('title').optional().trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:3}).withMessage('The title length should be greater than 5')
    .custom(async (val,{req}) => {
        let category = await Category.findOne({slug:slugify(val)})
        if (category)
            return Promise.reject(new Error('The title is already used'));

        req.body.slug = slugify(val);
    }),

    body('image').optional().trim()
    .notEmpty().withMessage('There is should be an imageUrl'),
    
    validationResult
];


exports.deleteCategory = [
    param('categoryId').isMongoId().withMessage('The categoryId is not valid'),
    validationResult
]

exports.addSubCategory = [
    body('categoryId')
    .isMongoId().withMessage('The categoryId is not valid'),
    
    body('subCategoryId')
    .isMongoId().withMessage('The subCategoryId is not valid'),
    
    validationResult
]

exports.removeSubCategory = [
    body('categoryId')
    .isMongoId().withMessage('The categoryId is not valid'),
    
    body('subCategoryId')
    .isMongoId().withMessage('The subCategoryId is not valid'),
    
    validationResult
]