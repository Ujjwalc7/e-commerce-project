const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');

const productController = require('../controller/product_controller');

router.post('/', protectedResource, productController.createProduct);
router.post('/creates', protectedResource, productController.createMultipleProducts);
router.put('/update/:id', protectedResource, productController.updateProduct);
router.delete('/delete/:id', protectedResource, productController.deleteProduct);


module.exports = router;

