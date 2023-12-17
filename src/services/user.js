const User = require('../models/user');
const Factory = require('./Factory');
const bcryptjs = require('bcryptjs');

// for user

exports.getUser = async (id,fullDetails) => {
    let user = await Factory.getOneById(User,id);
    user.password = '$';
    if (!fullDetails) {
        user.addresses = '$';
        user.role = '$';
        user.cart = '$';
    }
    return user;
}

exports.updateUser = async (id,user) => {return await Factory.updateOne(User,id,user);}

exports.deleteUser = async (id) => {return await Factory.deleteOne(User,id);}

exports.updatePassword = async (id,oldPassword,newPassword) => {
    try {
        let user = await Factory.getOneById(User,id);
        let verfiy = await bcryptjs.compare(oldPassword,user.password);
        if (!verfiy) throw {message:'There is an error with password',statusCode:402};
        let hashedNewPassword = await bcryptjs.hash(newPassword,12);
        await Factory.updateOne(User,id,{password:hashedNewPassword});
    }
    catch(err) {
        throw err;
    }
}

// for admin

exports.getUsers = async (page,limit,prefix,sortBy,desc,queries) => {return await Factory.getAll(User,page,limit,'-password',prefix,sortBy,desc,queries);}

// for manager

exports.promoteToAdmin = async (userId) => {return await Factory.updateOne(User,userId,{"role":"admin"});}

exports.demoteAdmin = async (adminId) => {return await Factory.deleteOne(User,adminId,{"role":"user"});}