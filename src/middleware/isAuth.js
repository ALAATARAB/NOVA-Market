let {getData} = require('../util/token');

exports.isAuth = (req,res,next) => {
    try {
        let {userId,email} = getData(req.get('Authorization'));
        if(!userId || !email)
            throw {message:"There is an error with the token *_*",statusCode:401};
        req.userId = userId;
        req.email = email;
        next();
    }
    catch(err) {
        return next(err);
    }
}