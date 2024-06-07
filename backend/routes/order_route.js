const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const orderController = require('../controller/oder_controller');

router.post('/',protectedResource, orderController.createOrder);
router.get('/user',protectedResource, orderController.orderHistory);
router.get('/:id',protectedResource, orderController.findOrderById);



module.exports = router