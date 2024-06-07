const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const protectedResource = require('../middleware/protectedResource');

router.get('/',userController.getAllUsers);
router.get('/profile',userController.getUserProfile);
router.post('/profile/new/address', protectedResource, userController.addNewAddress);
router.delete('/profile/delete/address/:id', protectedResource, userController.deleteAddress);
router.delete('/:id',userController.deleteUser);

module.exports = router;