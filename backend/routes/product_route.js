const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const productController = require('../controller/product_controller');

router.get('/', productController.getAllProducts);
router.get('/id/:id', productController.findProductById);

module.exports = router;

