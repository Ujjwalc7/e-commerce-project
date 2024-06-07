const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const orderController = require('../controller/adminOrder_controller');

router.get('/',protectedResource, orderController.getAllOrders);
router.put('/:orderId/confirmed',protectedResource, orderController.confirmedOrders);
router.put('/:orderId/ship',protectedResource, orderController.shipOrders);
router.put('/:orderId/deliver',protectedResource, orderController.deliverOrders);
router.put('/:orderId/cancel',protectedResource, orderController.cancelledOrders);
router.delete('/:orderId/delete',protectedResource, orderController.deleteOrderd);

module.exports = router;