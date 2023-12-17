const {validationResult} = require('express-validator');

const validationResultMiddleware = (req,res,next) => {
    let errors = validationResult(req);
    if (errors.array().length)
        return next({message:errors.array(),statusCode:409});
    next();
}

module.exports = validationResultMiddleware;