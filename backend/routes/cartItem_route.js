const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const cartItemController = require('../controller/cartItem_controller');

router.put('/delete',protectedResource, cartItemController.removeCartItem);
router.put('/:id',protectedResource, cartItemController.updateCartItem);

module.exports = router