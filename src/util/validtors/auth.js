const { body } = require('express-validator');
const validationResult = require('./validationResult');
const User = require('../../models/user');

exports.signUp = [
    body('name').trim()
        .notEmpty().withMessage('The name should not be empty')
        .isLength({min:5}).withMessage('the length of name should be greater than 5'),
    
    body('email').trim()
        .notEmpty().withMessage('There is no email')
        .isEmail().withMessage('The email is invalid')
        .custom(async (val) => {
            let user = await User.findOne({ email: val });
            if (user)
                return Promise.reject(new Error('There is an email such that'));
        }),

    body('password').trim()
        .notEmpty().withMessage('password should not be empty')
        .isLength({min:6,max:30}).withMessage('min length is 6 and max length is 30')
        .custom( async (val) => {
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
                return Promise.reject(new Error('The password should contain number,small and capital characters value'));
        }),
    
    body('role').optional()
    .custom(async (val) => {
        if (val !== 'user') 
            return Promise.reject(new Error('we catch you *_*'));
    }),
    
    body('image').trim()
    .notEmpty().withMessage('The image url should not be empty'),

    validationResult
];

exports.logIn = [
    body('email').trim()
        .notEmpty().withMessage('There is no email')
        .isEmail().withMessage('The email is invalid'),
    
    body('password').trim()
        .notEmpty().withMessage('password should not be empty')
        .isLength({min:6,max:30}).withMessage('min length is 6 and max length is 30'),
    
    validationResult
];
    
exports.forgetPassword = [
    body('email').trim()
        .notEmpty().withMessage('There is no email')
        .isEmail().withMessage('The email is invalid')
        .custom(async val => {
            let user = await User.findOne({email:val});
            if (!user)
                return Promise.reject(new Error('There is no email such that!!'));
            req.user = user;
        }),

    validationResult
]

exports.verfiyResetCode = [
    body('resetCode').trim()
        .notEmpty().withMessage('The reset code should not be empty'),
    
    body('userId')
        .isMongoId().withMessage('The userId invalid'),

    validationResult
]

exports.resetPassword = [
    body('password').trim()
        .notEmpty().withMessage('password should not be empty')
        .isLength({min:6,max:30}).withMessage('min length is 6 and max length is 30')
        .custom( async (val) => {
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
                return Promise.reject(new Error('The password should contain number,small and capital characters value'));
        }),

    body('userId')
        .isMongoId().withMessage('The userId invalid'),

    validationResult
]