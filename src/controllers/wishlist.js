const wishlistServices = require('../services/wishlist');

exports.insertToWishlist = async (req,res,next) => {
    try {
        let {productId} = req.body;
        let wishlist = await wishlistServices.insertToWishlist(req.userId,productId);
        res.status(201).json({message:'product added to wishlist successfully',wishlist});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteFromWishlist = async (req,res,next) => {
    try {
        let {productId} = req.body;
        let wishlist = await wishlistServices.deleteFromWishlist(req.userId,productId);
        res.status(202).json({message:'product deleted from wishlist successfully',wishlist});
    }
    catch(err) {
        return next(err);
    }
}

exports.getWishlist = async (req,res,next) => {
    try {
        let wishlist = await wishlistServices.getWishlist(req.userId);
        res.status(200).json({message:'Here is the wishlist',wishlist});
    }
    catch(err) {
        return next(err);
    }
}
