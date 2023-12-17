const mongoose = require('mongoose');
const {Types} = require('mongoose');

const Schema = new mongoose.Schema({
    user:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    shippingAddress:{
        city:String,
        details:String,
        phone:String,
        required:true
    },
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
    totalPrice:{
        type:Number,
        required:true,
    },
    discountRate:Number,
    paidAt: Date,
    deliveredAt: Date,
    shippingAddress : {
        city:String,
        phone:String,
        details:String,
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash'
    }
});

module.exports = mongoose.model('Order',Schema);