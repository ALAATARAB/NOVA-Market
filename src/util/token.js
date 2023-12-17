const jwt = require('jsonwebtoken');

exports.assignToken = (payload)=> {
    let token = jwt.sign(payload,process.env.SERCRET_KEY,{expiresIn:process.env.EXPIRY_TIME});
    token = "Bearer=" + token;
    return token;
}

exports.getData = (authorization)=> {
    if (!authorization || !String(authorization).startsWith('Bearer'))         
        throw {message:"There is an error with the token *_*",statusCode:401};;
    let token = String(authorization).split('=')[1];
    try {
        let data = jwt.verify(token,process.env.SERCRET_KEY);
        return data;
    }
    catch(err) {
        throw {message:"There is an error with the token *_*",statusCode:401};
    }
}