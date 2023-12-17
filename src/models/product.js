const mongoose = require('mongoose');
const {Types} = require('mongoose');

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    slug:{
        type:String,
        required:true
    },
    discountRate:{
        type:Number,
        default:0
    },
    category:{
        type:Types.ObjectId,
        ref:'Category',
    },
    brand:{
        type:Types.ObjectId,
        ref:'Brand',
    },
    imageCover:String,
    images:[String],
    description:{
        type:String,
        required:true
    },
    colorsQuantity: {
        type: Map,
        required:true
    },
    numOfStars:{
        type:Number,
        default:0
    },
    numOfRatings:{
        type:Number,
        default:0,
    },
    sold:{
        type:Number,
        default:0
    },
    subcategories:{
        type: Types.ObjectId,
        ref: 'SubCategory',
    }
});

module.exports = mongoose.model('Product',Schema);