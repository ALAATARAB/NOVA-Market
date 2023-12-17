const authService = require('../services/auth');
const tokenOps = require('../util/token');

exports.logIn = async (req,res,next) => {
    try {
        let {email,password} = req.body;
        let user = await authService.logIn(email,password);
        let token = tokenOps.assignToken({userId:user._id,email,role:user.role});
        res.status(200).json({message:"logged In successfully",user,token});
    }
    catch(err) {
        return next(err);
    }
}

exports.signUp = async (req,res,next) => {
    try {
        const {name,email,password,image}=req.body;
        await authService.signUp(email,password,name,image);
        res.status(201).json({message:'User Added'});
    }
    catch(err) {
        return next(err);
    }
}

exports.forgetPassword = async (req,res,next) => {
    try {
        const user = req.user;
        await authService.forgetPassword(user._id);
        res.status(200).json({message:'reset code has been sent',userId:user._id});
    }
    catch(err){
        return next(err);
    }
}

exports.verfiyResetCode = async (req,res,next)=> {
    try {
        let {resetCode,userId} = req.body;
        await authService.verfiyResetCode(userId,resetCode);
        res.status(200).json({message:'ResetCode Verfiyed',userId});
    }
    catch(err){
        return next(err);
    }
}

exports.resetPassword = async (req,res,next) => {
    try {
        let {password:newPassword,userId} = req.body;
        let user = await authService.resetPassword(userId,newPassword);
        let token = tokenOps.assignToken({userId,email:user.email});
        res.status(200).json({message:'password reset successfully',user,token});
    }
    catch(err){
        return next(err);
    }
}