const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const cartController = require('../controller/cart_controller');

router.get('/',protectedResource, cartController.findUserCart);
router.post('/add',protectedResource, cartController.addItemToCart);
module.exports = router