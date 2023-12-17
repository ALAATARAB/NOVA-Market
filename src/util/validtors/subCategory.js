const { body , query, param } = require('express-validator');
const validationResult = require('./validationResult');
const slugify = require('slugify');
const subCategory = require('../../models/subCategory');

exports.getSubCategories = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),
    
    validationResult
];

exports.getSubCategory = [
    param('subCategoryId').isMongoId().withMessage('The subCategoryId is not valid'),
    validationResult
]

exports.postSubCategory = [
    body('title').trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:3}).withMessage('The title length should be greater than 3')
    .custom(async (val,{req}) => {
        let subCategory = await subCategory.findOne({slug:slugify(val)})
            if (subCategory)
                return Promise.reject(new Error('The title is already used'));
            req.body.slug = slugify(val);
    }),
    
    body('image').optional().trim()
    .notEmpty().withMessage('There is should be an image Url'),
    
    validationResult
];

exports.updateSubCategory = [
    param('subCategoryId').isMongoId().withMessage('The subCategoryId is not valid'),

    body('title').optional().trim()
    .notEmpty().withMessage('The title should not be empty')
    .isLength({min:3}).withMessage('The title length should be greater than 3')
    .custom(async (val) => {
        await subCategory.findOne({slug:slugify(val)})(subCategory=> {
            if (subCategory) {
                return Promise.reject(new Error('The title is already used'));
            }
            req.body.slug = slugify(val);
            
        })
    }),

    body('image').optional().trim()
    .notEmpty().withMessage('There is should be an image Url'),

    validationResult
];


exports.deleteSubCategory = [
    param('subCategoryId').isMongoId().withMessage('The subCategoryId is not valid'),
    validationResult
]

