const addressService = require('../services/address');

exports.getAddresses = async (req,res,next) => {
    try {
        let addresses = await addressService.getAddresses(req.userId);
        res.status(200).json({message:"Here are the Addresses",addresses});
    }
    catch(err) {
        return next(err);
    }
}

exports.addAddress = async (req,res,next) => {
    try {
        let nAddress = req.body;
        let address = await addressService.insertAddress(req.userId,nAddress);
        res.status(201).json({message:'Address posted successfuly',address});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteAddress = async (req,res,next) => {
    try {
        let {addressId} = req.query;
        await addressService.deleteAddress(req.userId,addressId);
        res.status(202).json({message:'Address deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
}