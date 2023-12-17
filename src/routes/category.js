const express = require('express');
const router = express.Router();
const {getCategory,getCategories,deleteCategory,updateCategory,addCategory,insertSubCategory,deleteSubCategory} = require('../controllers/category');
const {isAdmin} = require('../middleware/isAdmin');
const Validator = require('../util/validtors/category');

router.route('/sub-category')
    .post(isAdmin,Validator.addSubCategory,insertSubCategory)
    .delete(isAdmin,Validator.removeSubCategory,deleteSubCategory);

router.route('/')
    .get(Validator.getCategories,getCategories)
    .post(isAdmin,Validator.postCategory,addCategory);

router.route('/:categoryId')
    .get(Validator.getCategory,getCategory)
    .put(isAdmin,Validator.updateCategory,updateCategory)
    .delete(isAdmin,Validator.deleteCategory,deleteCategory);


module.exports = router;