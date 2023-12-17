const { body , query } = require('express-validator');
const validationResult = require('./validationResult');

exports.updateUser = [
    body('name').optional().trim()
    .notEmpty().withMessage('The name should not be empty')
    .isLength({min:5}).withMessage('the length should be greater than 5'),

    body('email').optional().trim()
    .isEmail().withMessage('The email is invalid'),

    body('image').optional()
    .notEmpty().withMessage('The image should not be empty'),

    validationResult
];

exports.updatePassword = [
    body('oldPassword').trim()
    .notEmpty().withMessage('The old password should not be empty')
    .isLength({min:6,max:30}).withMessage('the length should be greater than 6'),
    
    body('newPassword').trim()
    .notEmpty().withMessage('new password should not be empty')
    .isLength({min:6,max:30}).withMessage('min length is 6 and max length is 30')
    .custom(async (val) => {
        let number=0;capCharacter=0,smallCharacter=0;
        for (let idx = 0; idx < val.length; idx++) {
            if (val[idx]>='0' && val[idx]<= '9') 
                number=1;
            else if (val[idx] >= 'a' && val[idx] <= 'z')
                smallCharacter=1;
            else if (val[idx] >= 'A' && val[idx] <= 'Z') 
                capCharacter=1;
        }
        if (!number || !capCharacter || !smallCharacter)
            return Promise.reject(new Error('The new password should contain number,small and capital characters value'));
    }),
    
    validationResult
];



exports.getUsers = [
    query('page')
    .isNumeric().withMessage('The page should be a Number')
    .notEmpty().withMessage('There is no page'),

    query('limit')
    .isNumeric().withMessage('The limit should be a Number')
    .notEmpty().withMessage('There is no limit'),

    validationResult
];

exports.getUser = [
    body('userId')
    .isMongoId().withMessage("Invalid userId")
    .custom( async (val,{req}) => {
        if (val === req.userId) req.fullDetails = 1;
    }),

    validationResult
];

exports.deleteUser = [
    body('userId')
    .isMongoId().withMessage("Invalid userId")
    .custom( async (val,{req}) => {
        if (val !== req.userId && req.role !== 'admin' && req.role !== 'manager')
            return Promise.reject(new Error('You can not delete other account *_*'));
    }),
    
    validationResult
];

exports.promoteToAdmin = [
    body('userId')
    .isMongoId().withMessage('Invalid userId'),

    validationResult
];

exports.demoteAdmin = [
    body('adminId')
    .isMongoId().withMessage('Invalid adminId'),
    
    validationResult
];