const Product = require('../models/product');
const Factory = require('./Factory');
const slugify = require('slugify');

// for user
exports.getProducts = async (page,limit,prefixName,sortBy,DESC) => {return await Factory.getAll(Product,page,limit,'-images -description -sold',prefixName,sortBy,DESC);}

exports.getProduct = async (productId) => {return await Factory.getOneById(Product,productId);}

// for admin
exports.insertProduct = async (product) => {
    let slug = slugify(product.title,{lower: true});
    product = {...product,slug};
    return await Factory.createOne(Product,product);
}

exports.updateProduct = async (productId,product) => {
    let slug = slugify(product.title||"",{lower: true});
    if (slug)
        product = {...product,slug};
    return await Factory.updateOne(Product,productId,product);
}

exports.deleteProduct = async (productId) => {return await Factory.deleteOne(Product,productId);}