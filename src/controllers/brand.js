const brandService = require('../services/brand');

exports.getBrands = async (req,res,next) => {
    try {
        let {page,limit,prefix} = req.query;
        let brands = await brandService.getBrands(page,limit,prefix||"");
        res.status(200).json({message:"Here are the Brands",brands});
    }
    catch(err) {
        return next(err);
    }
}

exports.getBrand = async (req,res,next) => {
    try {
        let {brandId} = req.params;
        let brand = await brandService.getBrand(brandId);
        res.status(200).json({message:'getting brand success',brand});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateBrand = async (req,res,next) => {
    try {
        let nBrand = req.body;
        let {brandId} = req.params;
        let brand = await brandService.updateBrand(brandId,nBrand);
        res.status(200).json({message:'brand updated successfuly',brand});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteBrand = async (req,res,next) => {
    try {
        let {brandId} = req.params;
        await brandService.deleteBrand(brandId);
        res.status(202).json({message:'brand deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
    
}

exports.addBrand = async (req,res,next) => {
    try {
        let nBrand = req.body;
        let brand = await brandService.insertBrand(nBrand);
        res.status(201).json({message:'brand posted successfuly',brand});
    }
    catch(err) {
        return next(err);
    }
}