const categoryService = require('../services/category');

exports.getCategories = async (req,res,next) => {
    try {
        let {page,limit,prefix} = req.query;
        let categorys = await categoryService.getCategories(page,limit,prefix||"");
        res.status(200).json({message:"Here are the Categorys",categorys});
    }
    catch(err) {
        return next(err);
    }
}

exports.getCategory = async (req,res,next) => {
    try {
        let {categoryId} = req.params;
        let category = await categoryService.getCategory(categoryId);
        res.status(200).json({message:'getting category success',category});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateCategory = async (req,res,next) => {
    try {
        let nCategory = req.body;
        let {categoryId} = req.params;
        let category = await categoryService.updateCategory(categoryId,nCategory);
        res.status(200).json({message:'category updated successfuly',category});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteCategory = async (req,res,next) => {
    try {
        let {categoryId} = req.params;
        await categoryService.deleteCategory(categoryId);
        res.status(202).json({message:'category deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
    
}

exports.addCategory = async (req,res,next) => {
    try {
        let nCategory = req.body;
        let category = await categoryService.insertCategory(nCategory);
        res.status(201).json({message:'category posted successfuly',category});
    }
    catch(err) {
        return next(err);
    }
}

exports.insertSubCategory = async (req,res,next) => {
    try {
        let {categoryId,subCategoryId} = req.body;
        let subCategories = await categoryService.insertSubCategory(categoryId,subCategoryId);
        res.status(201).json({message:'insert subCategory successed',subCategories});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteSubCategory = async (req,res,next) => {
    try {
        let {categoryId,subCategoryId} = req.body;
        let subCategories = await categoryService.removeSubCategory(categoryId,subCategoryId);
        res.status(202).json({message:'delete subCategory successed'});
    }
    catch(err) {
        return next(err);
    }
}