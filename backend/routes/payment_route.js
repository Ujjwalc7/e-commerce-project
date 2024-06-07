const express = require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const paymentController = require('../controller/paymentController');


router.post('/:id', protectedResource, paymentController.createPaymentLink);
router.get('/', protectedResource, paymentController.updatePaymentInformation);

module.exports = router;