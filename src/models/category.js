const mongoose = require('mongoose');
const {Types} = require('mongoose');

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
        required:true,
        unique:true
    },
    subCategories:[{
        type:Types.ObjectId,
        ref:'SubCategory'
    }],
});

module.exports = mongoose.model('Category',Schema);