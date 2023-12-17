const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    image:String,
    slug:{
        type:String,
        required:true,
        unique:true,
    }
});

module.exports = mongoose.model('SubCategory',Schema);