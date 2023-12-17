const User = require('../models/user');
const ApiError = require('../util/apiError');

exports.getWishlist = async (userId) => {
    try {
        // get wishlist and just popluate the important things
        const user = await User.findById(userId).select('wishlist').populate('wishlist','-images -description -sold');
        return user.wishlist;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.insertToWishlist = async (userId,productId) => {
    try {
        // insert a certain productId to user's wishlist
        const user = await User.findByIdAndUpdate(userId,
            { $addToSet: {'wishlist': productId }},
            { new: true }
        ).select('wishlist');
        return user.wishlist;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.deleteFromWishlist = async (userId,productId) => {
    try {
        // delete a certain productId from the user's wishlist
        const user = await User.findByIdAndUpdate(userId,
            { $pull: { 'wishlist': productId }},
            { new: true }
        ).select('wishlist');
        return user.wishlist;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}