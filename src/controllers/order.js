const orderService = require('../services/order');
const cartService = require('../services/cart');

exports.getOrders = async (req,res,next) => {
    try {
        let {page,limit} = req.query;
        let orders = await orderService.getOrders(page,limit);
        res.status(200).json({message:"Here are the orders",orders});
    }
    catch(err) {
        return next(err);
    }
}

exports.getOrder = async (req,res,next) => {
    try {
        let {orderId} = req.params;
        let order = await orderService.getOrder(orderId);
        res.status(200).json({message:"Here are the order",order});
    }
    catch(err) {
        return next(err);
    }
}

exports.insertOrder = async (req,res,next) => {
    try {
        let nOrder = req.order;
        let user = req.userId;
        let {cartId} = req.body;
        nOrder = {...nOrder,user};
        let order = await orderService.insertOrder(nOrder);
        // it doesn't matter if we delete it now or after
        cartService.clearCart(cartId);
        res.status(201).json({message:'order posted successfuly',order});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteOrder = async (req,res,next) => {
    try {
        let {orderId} = req.params;
        await orderService.deleteOrder(orderId);
        res.status(202).json({message:'order deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateOrder = async (req,res,next) => {
    try {
        let {paidAt,deliveredAt} = req.body;
        let {orderId} = req.params;
        let order = await orderService.updateOrder(orderId,{paidAt,deliveredAt});
        res.status(200).json({message:'order updated successfuly',order});
    }
    catch(err) {
        return next(err);
    }
}

exports.getOrdersBelongsToUser = async (req,res,next) => {
    try {
        let {limit,page} = req.query;
        let userId= req.userId;
        let orders = await orderService.getOrdersBelongsToUser(userId,page,limit);
        res.status(200).json({message:'getting orders success',orders});
    }
    catch(err) {
        return next(err);
    }
}