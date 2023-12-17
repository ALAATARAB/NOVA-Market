const express = require('express');
const router = express.Router();
const {postReview,deleteReview,updateReview} = require('../controllers/review');
const {isAuth} = require('../middleware/isAuth');
const Validator = require('../util/validtors/review');

router.post('/',isAuth,Validator.postReview,postReview);

router.route('/:reviewId')
    .put(isAuth,Validator.updateReview,updateReview)    
    .delete(isAuth,Validator.deleteReview,deleteReview);

module.exports = router;