const reviewServices = require('../services/review');

exports.postReview = async (req,res,next) => {
    try {
        let rev = req.body;
        rev.userId = req.userId;
        let review = await reviewServices.insertReview(rev);
        res.status(201).json({message:'review posted successfully',review});
    }
    catch(err) {
        return next(err);
    }
}

exports.deleteReview = async (req,res,next) => {
    try {
        let reviewId = req.params.reviewId;
        await reviewServices.deleteReview(reviewId);
        res.status(202).json({message:'review deleted successfully'});
    }
    catch(err) {
        return next(err);
    }
}

exports.updateReview = async (req,res,next) => {
    try {
        let reviewId = req.params.reviewId;
        let review = req.body;
        let newReview = await reviewServices.updateReview(reviewId,review);
        res.status(200).json({message:'review updated successfully',newReview});
    }
    catch(err) {
        return next(err);
    }
}
