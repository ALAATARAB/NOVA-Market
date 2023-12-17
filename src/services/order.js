const Order = require('../models/order');
const Factory = require('./Factory');
const Product = require('../models/product');

// for user
exports.insertOrder = async (order) => {
    let {items} = order;
    items.map( async (item) => {
        let {colorsQuantity,sold} = await Factory.getOneById(Product,item.product);
        let oldQuantity = colorsQuantity.get(item.color);
        colorsQuantity.set(item.color,oldQuantity-item.quantity);
        sold+=item.quantity;
        await Factory.updateOne(Product,item.product,{colorsQuantity,sold});
    });
    return await Factory.createOne(Order,order);
}

exports.getOrder = async (orderId) => {return await Factory.getOneById(Order,orderId);}

exports.getOrdersBelongsToUser = async (userId,page,limit) => {return await Factory.getAll(Order,page,limit,'','',undefined,0,[{user:userId}]);}

// for admins
exports.getOrders = async (page,limit) => {return await Factory.getAll(Order,page,limit);}

exports.updateOrder = async (orderId,edit) => {return await Factory.updateOne(Order,orderId,edit);}

exports.deleteOrder = async (orderId) => {return await Factory.deleteOne(Order,orderId);}