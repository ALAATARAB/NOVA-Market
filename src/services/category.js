const Factory = require('./Factory');
const Category = require('../models/category');

// for user

exports.getCategories = async (page,limit,prefix) => {return await Factory.getAll(Category,page,limit,'',prefix);}

exports.getCategory = async (id) => {return await Factory.getOneById(Category,id,'subCategories');}

// for admins

exports.insertCategory = async (category) => {return await Factory.createOne(Category,category);}

exports.updateCategory = async (id,category) => {return await Factory.updateOne(Category,id,category);}

exports.deleteCategory = async (id) => {return await Factory.deleteOne(Category,id);}

exports.insertSubCategory = async (categoryId,subCategoryId) => {
    try {
        const category = await Category.findByIdAndUpdate(categoryId,
            {$addToSet: { 'subCategories': subCategoryId }},
            { new: true }
        ).select('subCategories');
        return category.subCategories;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}

exports.removeSubCategory = async (categoryId,subCategoryId) => {
    try {
        await Category.findByIdAndUpdate(categoryId,
            {$pull: { 'subCategories': subCategoryId }},
            { new: true }
        );
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
}