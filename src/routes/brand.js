const express = require('express');
const router = express.Router();
const {getBrand,getBrands,deleteBrand,updateBrand,addBrand} = require('../controllers/brand');
const {isAdmin} = require('../middleware/isAdmin');
const Validator = require('../util/validtors/brand');

router.route('/')
    .get(Validator.getBrands,getBrands)
    .post(isAdmin,Validator.postBrand,addBrand);

router.route('/:brandId')
    .get(Validator.getBrand,getBrand)
    .put(isAdmin,Validator.updateBrand,updateBrand)
    .delete(isAdmin,Validator.deleteBrand,deleteBrand);

module.exports = router;