const mongoose = require('mongoose');
const {Types} = require('mongoose');

const Schema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:Types.ObjectId,
        ref:'Product',
        required:true
    },
    stars:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Review',Schema);