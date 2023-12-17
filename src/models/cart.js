const mongoose = require('mongoose');
const Types = mongoose.Types;

const Schema = new mongoose.Schema({
    items:[{
        product:{
            type:Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type:Number,
            default:1,
        },
        color:String,
        price:Number,
        discountedPrice:Number
    }],
    totalPrice: Number,
    discountRate: Number,
});

module.exports = mongoose.model('Cart',Schema);