const User = require('../models/user');
const slugify = require('slugify');
const bcryptjs = require('bcryptjs');
const ApiError = require('../util/apiError');


exports.logIn = async (email,password)=> {
    try {
        const user = await User.findOne({email:email});
        if (!user)
            throw {message:'There is no an email like that',statusCode:404};
        let verfiy = await bcryptjs.compare(password,user.password);
        if (!verfiy) throw {message:'There is an error with password',statusCode:402};
        user.password = '$';
        return user;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.signUp = async (email,password,name,image)=> {
    try {
        let nPassword = await bcryptjs.hash(password,12);
        const user = await User.create({email,password:nPassword,name,image,slug:slugify(name)});
        user.password = '$';
        return user;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.forgetPassword = async (userId)=> {
    try {
        const resetCode =Math.floor(100000 + Math.random() * 900000).toString();

        let passwordResetCode = resetCode;
        let passwordResetExpires = Date.now() + 10 * 60 * 1000;
        let passwordResetVerified = false;
        let add = {passwordResetCode,passwordResetExpires,passwordResetVerified};
        let user = await User.findByIdAndUpdate(userId,add);

        const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
        try {
            await sendEmail({
                email: user.email,
                subject: 'Your password reset code (valid for 10 min)',
                message,});
        }
        catch(err) {
            user.passwordResetCode = '';
            // Add expiration time for password reset code (10 min)
            user.passwordResetExpires = undefined;
            user.passwordResetVerified = false;
            await user.save();
            throw new ApiError(err.message,err.statusCode||500);
        }
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.verfiyResetCode = async (userId,resetCode)=> {
    try {
        let user = await User.findById(userId);
        if (!user) 
            throw {message:'There is an error',statusCode:404};
        if (user.passwordResetCode != resetCode)
            throw {message:'The reset Code is not correct',statusCode:404};
        if (user.passwordResetExpires < Date.now()) 
            throw {message:'The reset Code is expired',statusCode:404};
        user.passwordResetVerified = true;
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        delete user.password;
        return user;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.resetPassword = async (userId,newPassword)=> {
    try {
        let user = await User.findById(userId);
        if (!user) throw {message:'There is an error',statusCode:404};
        if (!user.passwordResetVerified) throw {message:'Something goes wrong with verfication',statusCode:404};
        let bPassword = await bcryptjs.hash(newPassword,12);
        user.password = bPassword;
        user.passwordResetVerified = false;
        await user.save();
        user.password = '$';
        return user;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}