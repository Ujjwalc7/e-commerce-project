const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');
const reviewController = require('../controller/review_controller');


router.post('/create', protectedResource, reviewController.createReview);
router.get('/product/:productId', protectedResource, reviewController.getAllReviews);

module.exports = router;

