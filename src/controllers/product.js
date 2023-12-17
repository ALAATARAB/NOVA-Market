const productServices = require('../services/product');
const reviewServices = require('../services/review');

exports.getProducts = async (req,res,next)=> {
    try {
        let {page,limit,sortBy,prefix,desc} = req.query;
        let prodcuts = await productServices.getProducts(page,limit,prefix,sortBy,desc==='1');
        res.status(200).json({prodcuts});
    }
    catch(err) {
        return next(err);
    }
}

exports.postProduct = async (req,res,next) => {
    try {
        let nProd = req.body;
        let product = await productServices.insertProduct(nProd);
        res.status(201).json({message:'product posted successfuly',product});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateProduct = async (req,res,next) => {
    try {
        let nProd = req.body;
        let {productId} = req.params;
        let product = await productServices.updateProduct(productId,nProd);
        res.status(200).json({message:'product updated successfuly',product});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteProduct = async (req,res,next) => {
    try {
        let {productId} = req.params;
        await productServices.deleteProduct(productId);
        res.status(202).json({message:'product deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
}

exports.getProduct = async (req,res,next) => {
    try {
        let {productId} = req.params;
        let product = await productServices.getProduct(productId);
        res.status(200).json({message:'getting product success',product});
    }
    catch(err) {
        return next(err);
    }
}

exports.getProductsByName = async (req,res,next) => {
    try {
        let prodName = req.params.prodName;
        let {page,limit} = req.query;
        let products = await productServices.getProducts(page,limit,prodName);
        res.status(200).json({message:'getting product success',products});
    }
    catch(err) {
        return next(err);
    }
}

exports.getReviews = async (req,res,next) => {
    try {
        let {productId} = req.params;
        let {page,limit,stars} = req.query;
        let reviews = await reviewServices.getReviews(productId,page,limit,stars);
        res.status(200).json({message:'here are the reviews',reviews});
    }
    catch(err) {
        return next(err);
    }
}
