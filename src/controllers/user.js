const userServices = require('../services/user');


exports.getUser = async (req,res,next) => {
    try {
        let {userId} = req.body;
        let user = await userServices.getUser(userId,req.fullDetails);
        res.status(200).json({message:"Here are the user",user});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateUser = async (req,res,next) => {
    try {
        let userId = req.userId;
        let {name,email,image} = req.body;
        let user = await userServices.updateUser(userId,{name,email,image});
        res.status(200).json({message:"user updated succussfuly",user});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteUser = async (req,res,next) => {
    try {
        let {userId} = req.body;
        await userServices.deleteUser(userId);
        res.status(202).json({message:"user deleted successfuly"});
    }
    catch(err) {
        return next(err);
    }
}

exports.getUsers = async (req,res,next) => {
    try {
            let {page,limit,sortBy,prefix,desc} = req.query;
        let users = await userServices.getUsers(page,limit,prefix,sortBy,desc==='1');
        res.status(200).json({message:"Here are the users",users});
    }
    catch(err) {
        return next(err);
    }
}

exports.promoteToAdmin = async (req,res,next) => {
    try {
        let {userId} = req.body;
        let admin = await userServices.promoteToAdmin(userId);
        res.status(201).json({message:"Admin added successfuly",admin});
    }
    catch(err) {
        return next(err);
    }
}

exports.demoteAdmin = async (req,res,next) => {
    try {
        let {adminId} = req.body;
        await userServices.demoteAdmin(adminId);
        res.status(202).json({message:"Admin deleted successfuly"});
    }
    catch(err) {
        return next(err);
    }
}

exports.updatePassword = async (req,res,next) => {
    try {
        let userId = req.userId;
        let {oldPassword,newPassword} = req.body;
        await userServices.updatePassword(userId,oldPassword,newPassword);
        res.status(200).json({message:"Password updated successfuly"});
    }
    catch(err) {
        return next(err);
    }
}