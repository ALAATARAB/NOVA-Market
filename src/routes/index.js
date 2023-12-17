const authRoutes = require('./auth');
const productRoutes = require('./product');
const reviewsRoutes = require('./review');
const brandRoutes = require('./brand');
const addressRoutes = require('./address');
const wishlistRoutes = require('./wishlist');
const couponRoutes = require('./coupon');
const categoryRoutes = require('./category');
const subCategoryRoutes = require('./subCategory');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const userRoutes = require('./user');

const mountRoutes = (app) => {
    app.use('/auth',authRoutes);
    app.use('/reviews',reviewsRoutes);
    app.use('/products',productRoutes);
    app.use('/brands',brandRoutes);
    app.use('/addresses',addressRoutes);
    app.use('/wishlist',wishlistRoutes);
    app.use('/coupons',couponRoutes);
    app.use('/categories',categoryRoutes);
    app.use('/sub-categories',subCategoryRoutes);
    app.use('/cart',cartRoutes);
    app.use('/orders',orderRoutes);
    app.use('/users',userRoutes);
}

module.exports= mountRoutes;