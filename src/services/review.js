const Review = require('../models/review');
const Factory = require('./Factory');
const Product = require('../models/product');

// for user
exports.getReviewsBelongsToUser = async (userId,page,limit) => {
    let queries = [{'person':userId}];
    return await Factory.getAll(Review,page,limit,'','',undefined,0,queries);
}

exports.getReviews = async (productId,page,limit,stars) => {
    let queries = [{'product':productId}];
    // if there is stars attr search add it to the queries array
    if (stars)
        queries.push({'stars':stars});
    return await Factory.getAll(Review,page,limit,'','',undefined,0,queries);
}

exports.insertReview = async (data) => {
    try {
        // add the stars to the product and add one to the ratings number
        let review = await Factory.createOne(Review,data);
        await Product.findByIdAndUpdate(review.product,{
            $inc:{numOfStars:+review.stars , numOfRatings:+1},
        });
        return review;
    }
    catch(err) {
        throw {message:"There is an error with server",statusCode:500};
    }
}

exports.updateReview = async (reviewId,review) => {
    try {
        // if there is an update on the stars edit it in the product's stars
        let oldReview = await Factory.getOneById(Review,reviewId);
        let {newStars} = review.stars;
        if (newStars) {
            await Product.findByIdAndUpdate(oldReview.product,{
                $inc:{numOfStars: newStars - oldReview.stars},
            });
        }
        let newReview = await Factory.updateOne(Review,reviewId,review);
        return newReview;
    }
    catch(err) {
        throw {message:"There is an error with server",statusCode:500};
    }
}

exports.deleteReview = async (reviewId) => {
    try {
        // just delete the review
        let {product,stars} = await Factory.deleteOne(Review,reviewId);
        await Product.findByIdAndUpdate(product,{
            $inc:{ numOfStars:-stars , numOfRatings:-1 },
        });
    }
    catch(err) {
        throw {message:"There is an error with server",statusCode:500};
    }
}