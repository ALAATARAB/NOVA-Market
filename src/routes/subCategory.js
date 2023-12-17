const express = require('express');
const router = express.Router();
const {getSubCategory,getSubCategories,deleteSubCategory,updateSubCategory,addSubCategory} = require('../controllers/subCategory');
const {isAdmin} = require('../middleware/isAdmin');
const Validator = require('../util/validtors/subCategory');

router.route('/')
    .get(Validator.getSubCategories,getSubCategories)
    .post(isAdmin,Validator.postSubCategory,addSubCategory);

router.route('/:subCategoryId')
    .get(Validator.getSubCategory,getSubCategory)
    .put(isAdmin,Validator.updateSubCategory,updateSubCategory)
    .delete(isAdmin,Validator.deleteSubCategory,deleteSubCategory);


module.exports = router;