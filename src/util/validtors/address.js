const { body ,query} = require('express-validator');
const validationResult = require('./validationResult');

exports.addAddress = [
    body('title').trim()
        .notEmpty().withMessage('The name should not be empty'),
    
    body('phone').trim()
        .notEmpty().withMessage('There is no phone number')
        .isNumeric().withMessage('should contain only numbers')
        .isLength(10).withMessage('This is not a phone number'),
    
    body('details').trim()
        .notEmpty().withMessage('details should not be empty')
        .isLength({max:100}).withMessage('min length is 6 and max length is 30'),
    
    validationResult
];

exports.deleteAddress = [
    query('addressId').notEmpty().withMessage('The addressId is empty').isMongoId().withMessage('The addressId is not valid'),
    validationResult
]