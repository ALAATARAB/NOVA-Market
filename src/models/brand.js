const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    }
});

module.exports = mongoose.model('Brand',Schema);