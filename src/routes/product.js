const express = require('express');
const router = express.Router();
const {getProduct,getProducts,postProduct,updateProduct,deleteProduct,getReviews} = require('../controllers/product');
const {isAdmin} = require('../middleware/isAdmin');
const Validator = require('../util/validtors/product');

router.get('/reviews/:productId',Validator.getReviews,getReviews);

router.route('/')
    .get(Validator.getProducts,getProducts)
    .post(isAdmin,Validator.postProduct,postProduct);

router.route('/:productId')
    .get(Validator.getProduct, getProduct)
    .put(isAdmin,Validator.updateProduct,updateProduct)
    .delete(isAdmin,Validator.deleteProduct,deleteProduct);

module.exports = router;