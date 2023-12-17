const express = require('express');
const router = express.Router();
const {getUser,getUsers,demoteAdmin,deleteUser,updateUser,promoteToAdmin, updatePassword} = require('../controllers/user');
const {isAdmin} = require('../middleware/isAdmin');
const {isManager} = require('../middleware/isManager');
const {isAuth} = require('../middleware/isAuth');
const Validator = require('../util/validtors/user');


router.route('/')
    .get(isAuth,Validator.getUser,getUser)
    .put(isAuth,Validator.updateUser,updateUser)
    .delete(isAuth,Validator.deleteUser,deleteUser);

router.put('/update-passwrod',isAuth,Validator.updatePassword,updatePassword);

router.get('/get-users',isAdmin,Validator.getUsers,getUsers);

router.route('/admin')
    .put(isManager,Validator.promoteToAdmin,promoteToAdmin)
    .delete(isManager,Validator.demoteAdmin,demoteAdmin);

module.exports = router;