const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    expiresIn:{
        type:Date,
        required:true
    },
    discount: {
        type: Number,
        required: true,
        min: 1,
        max: 99,
    }
});

module.exports = mongoose.model('Coupon',Schema);