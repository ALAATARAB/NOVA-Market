const Factory = require('./Factory');
const SubCategory = require('../models/subCategory');

// for user

exports.getSubCategories = async (page,limit,prefix) => {return await Factory.getAll(SubCategory,page,limit,'',prefix);}

exports.getSubCategory = async (id) => {return await Factory.getOneById(SubCategory,id);}

// for admins

exports.insertSubCategory = async (subCategory) => {return await Factory.createOne(SubCategory,subCategory);}

exports.updateSubCategory = async (id,subCategory) => {return await Factory.updateOne(SubCategory,id,subCategory);}

exports.deleteSubCategory= async (id) => {return await Factory.deleteOne(SubCategory,id);}