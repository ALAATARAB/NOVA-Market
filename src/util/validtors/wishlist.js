const { body } = require('express-validator');
const validationResult = require('./validationResult');

const wishlistValidator = [
    body('productId').isMongoId().withMessage("Invalid productId"),
    validationResult
];

module.exports = wishlistValidator;