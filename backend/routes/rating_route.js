const express= require('express');
const router = express.Router();
const protectedResource = require('../middleware/protectedResource');
const ratingController = require('../controller/rating_service');


router.post('/create', protectedResource, ratingController.createRating);
router.put('/product/:productId', protectedResource, ratingController.getAllRatings);

module.exports = router;

