let {getData} = require('../util/token');

exports.isManager = (req,res,next) => {
    try {
        let {userId,email,role} = getData(req.get('Authorization'));
        if(!userId || !email || role!=='manager')
            throw {message:"You are not a manager *_*",statusCode:401};
        req.userId = userId;
        req.email = email;
        req.role = "manager";
        next();
    }
    catch(err) {
        return next(err);
    }
}