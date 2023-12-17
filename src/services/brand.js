const Brand = require('../models/brand');
const Factory = require('./Factory');
const slugify = require('slugify');

// for user

exports.getBrands = async (page,limit,prefix) => {return await Factory.getAll(Brand,page,limit,'',prefix);}

exports.getBrand = async (id) => {return await Factory.getOneById(Brand,id,'categories');}

// for admins

exports.insertBrand = async (brand) => {return await Factory.createOne(Brand,brand);}

exports.updateBrand = async (id,brand) => {return await Factory.updateOne(Brand,id,brand);}

exports.deleteBrand = async (id) => {return await Factory.deleteOne(Brand,id);}