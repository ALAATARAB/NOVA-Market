let {getData} = require('../util/token');

exports.isAdmin = (req,res,next) => {
    try {
        let {userId,email,role} = getData(req.get('Authorization'));
        if(!userId || !email || (role != "admin" && role != "manager"))
            throw {message:"You are not allowed to this *_*",statusCode:401};
        req.userId = userId;
        req.email = email;
        req.role = "admin";
        next();
    }
    catch(err) {
        return next(err);
    }
}