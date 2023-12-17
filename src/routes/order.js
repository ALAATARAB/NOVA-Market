const express = require('express');
const router = express.Router();
const {insertOrder,getOrder,getOrders,updateOrder,deleteOrder,getOrdersBelongsToUser} = require('../controllers/order');
const {isAuth} = require('../middleware/isAuth');
const {isAdmin} = require('../middleware/isAdmin');
const Validator = require('../util/validtors/order');

router.get('/to-user',isAuth,Validator.getOrders,getOrdersBelongsToUser);

router.route('/')
    .get(isAdmin,Validator.getOrders,getOrders)
    .post(isAuth,Validator.postOrder,insertOrder);

router.route('/:orderId')
    .get(isAuth,Validator.getOrder,getOrder)
    .put(isAdmin,Validator.updateOrder,updateOrder)
    .delete(isAdmin,Validator.deleteOrder,deleteOrder);

module.exports = router;