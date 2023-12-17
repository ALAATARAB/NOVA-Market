const User = require('../models/user');
const ApiError = require('../util/apiError');

exports.getAddresses = async (userId) => {
    try {
        let user = await User.findById(userId).select('addresses');
        return user.addresses;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.insertAddress = async (userId,address) => {
    try {
        // add address to the adresses list to the user
        const user = await User.findByIdAndUpdate(userId,
            {$addToSet: { addresses: address }},
            { new: true }
        ).select('addresses');
        return user.addresses;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.deleteAddress = async (userId,addressId) => {
    try {
        // delete the certain address for the user
        const user = await User.findByIdAndUpdate(userId,
            {$pull: { addresses: { id:addressId } }},
            { new: true }
        ).select('addresses');
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}