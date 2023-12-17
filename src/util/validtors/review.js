const { body , param } = require('express-validator');
const Review = require('../../models/review');
const validationResult = require('./validationResult');

exports.postReview = [
    body('description').trim()
    .notEmpty().withMessage('The review should not be empty'),

    body('stars')
    .notEmpty().withMessage('stars value not found')
    .isFloat({ min: 1, max: 10 }).withMessage('Ratings value must be between 1 to 5'),    
    
    body('product')
    .isMongoId().withMessage('The product id not found')
    .custom( async (val, { req }) => {
        let review = await Review.findOne({ userId: req.userId, product: val});
        if (review)
            return Promise.reject(new Error('You have already reviewed this product'));
    }),

    validationResult
]

exports.updateReview = [
    body('description').optional().trim()
    .notEmpty().withMessage('The review should not be empty'),
    
    body('stars').optional()
    .isFloat({ min: 1, max: 10 }).withMessage('Ratings value must be between 1 to 5'),    
    
    body('product').isEmpty().withMessage('you should not change product'),

    param('reviewId')
    .isMongoId().withMessage('review id must be there')
    .custom(async (val,{req})=> {
        let review = await Review.findById(val);
        let userId = req.userId;
        if (review.userId != userId) {
            return Promise.reject(
                new Error('You are not creator of the review')
            );
        }
    }),
    validationResult
]

exports.deleteReview = [
    param('reviewId')
    .isMongoId().withMessage('review id must be there')
    .custom(async (val,{req})=> {
        let review = await Review.findById(val);
        let userId = req.userId;
        if (review.userId != userId) {
            return Promise.reject(
                new Error('You are not creator of the review')
            );
        }
    }),
    validationResult
]