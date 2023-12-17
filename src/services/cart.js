const Cart = require('../models/cart');
const Factory = require('./Factory');
const Product = require('../models/product');
const User = require('../models/user');
const ApiError = require('../util/apiError');

exports.getCart = async (userId,cartId) => {
    if(cartId)
        return await Cart.findById(cartId).populate('items.product','title imageCover');
    // for first time when there is no cart to this user
    let user = await Factory.getOneById(User,userId,'cart');
    if (user.cart)
        return user.cart;
    return await this.createCart(userId);
}

exports.createCart = async (userId) => {
    try {
        let cart = await Factory.createOne(Cart,{items:[],totalPrice:0,discountRate:0});
        await Factory.updateOne(User,userId,{cart:cart._id});
        return cart;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.addToCart = async (cartId,productId,color,quantity) => {
    try {
        const product = await Factory.getOneById(Product,productId);
        const cart = await Factory.getOneById(Cart,cartId);
        let {items} = cart;
        let idx = items.findIndex((item) => item.product == productId && item.color === color);
        if (idx !== -1)
            throw {message:'The product is already in the cart!!',statusCode:404};
        let {price,discountRate} = product;
        let discountedPrice = price - (+(price * discountRate).toFixed(2));
        let newItem = {product:productId,quantity,color,price,discountedPrice};
        let totalPrice = cart.totalPrice;
        totalPrice += discountedPrice*quantity;
        return await Cart.findByIdAndUpdate(cartId,
            { $addToSet: { items: newItem },totalPrice},
            { new:true }
        );
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.updateCart = async (cartId,productId,color,quantity) => {
    try {
        let cart = await Factory.getOneById(Cart,cartId);
        let {items} = cart;
        let idx = items.findIndex((item) => item.product == productId && item.color === color);
        if (idx === -1) {
            throw {message:'There is no product like that in cart!!',statusCode:404};
        }
        let {quantity:oldQuantity,discountedPrice} = items[idx];
        cart.totalPrice -= oldQuantity * discountedPrice;
        items[idx].quantity = quantity;
        cart.totalPrice += (+discountedPrice.toFixed(2))*quantity;
        return await Factory.updateOne(Cart, cart._id,cart);
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.clearCart= async (cartId) => {
    return await Factory.updateOne(Cart,cartId,{items:[],totalPrice:0,discountRate:0});
}

exports.applyCoupon = async (cartId,coupon) => {
    try {
        let cart = await Factory.getOneById(Cart,cartId);
        
        if (cart.discountRate)
            throw {message:"You applied a coupon before!!",statusCode:409};
        
        discountRate = coupon.discount;
        let nCart = await Factory.updateOne(Cart,cartId,{discountRate});
        return nCart;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}