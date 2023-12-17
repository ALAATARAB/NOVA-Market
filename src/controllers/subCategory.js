const subCategoryService = require('../services/subCategory');

exports.getSubCategories = async (req,res,next) => {
    try {
        let {page,limit,prefix} = req.query;
        let categories = await subCategoryService.getSubCategories(page,limit,prefix||"");
        res.status(200).json({message:"Here are the subCategories",categories});
    }
    catch(err) {
        return next(err);
    }
}

exports.getSubCategory = async (req,res,next) => {
    try {
        let {subCategoryId} = req.params;
        let subCategory = await subCategoryService.getSubCategory(subCategoryId);
        res.status(200).json({message:'getting subCategory success',subCategory});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateSubCategory = async (req,res,next) => {
    try {
        let nsubCategory = req.body;
        let {subCategoryId} = req.params;
        let subCategory = await subCategoryService.updateSubCategory(subCategoryId,nsubCategory);
        res.status(200).json({message:'subCategory updated successfuly',subCategory});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteSubCategory = async (req,res,next) => {
    try {
        let {subCategoryId} = req.params;
        await subCategoryService.deleteSubCategory(subCategoryId);
        res.status(202).json({message:'subCategory deleted successfuly'});
    }
    catch(err) {
        return next(err);
    }
    
}

exports.addSubCategory = async (req,res,next) => {
    try {
        let nsubCategory = req.body;
        let subCategory = await subCategoryService.insertSubCategory(nsubCategory);
        res.status(201).json({message:'subCategory posted successfuly',subCategory});
    }
    catch(err) {
        return next(err);
    }
}
