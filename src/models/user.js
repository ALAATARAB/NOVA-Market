const mongoose = require('mongoose');
const {Types} = require('mongoose');

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    slug:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wishlist:[{
        type:Types.ObjectId,
        ref:'Product'
    }],
    addresses:[{
        id:Types.ObjectId,
        title:String,
        phone:String,
        details:String,
    }],
    role:{
        type:String,
        enum:['user','admin','manager'],
        default:'user'
    },
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResetVerified: Boolean,
    cart:{
        type:Types.ObjectId,
        ref:'Cart'
    },
    image:String
});

module.exports = mongoose.model('User',Schema);