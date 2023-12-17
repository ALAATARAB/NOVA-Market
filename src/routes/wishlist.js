const express = require('express');
const router = express.Router();
const {getWishlist,insertToWishlist,deleteFromWishlist} = require('../controllers/wishlist')
const {isAuth} = require('../middleware/isAuth');
const Validator = require('../util/validtors/wishlist');

router.route('/').
    get(isAuth,getWishlist).
    post(isAuth,Validator,insertToWishlist).
    delete(isAuth,Validator,deleteFromWishlist);

module.exports = router;