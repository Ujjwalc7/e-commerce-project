const ratingService = require('../services/rating_service');

const createRating = async(req, res) => {
    const user = req.user;
    try {
        const rating = await ratingService.createRating(req.body, user);
        return res.status(201).json({rating});
    } catch (error) {
        return res.status(500).json({error});
    }
}

const getAllRatings = async(req, res) => {
    const productId = req.params.productId;
    try {
        const ratings = await ratingService.getProductRating(productId);
        return res.status(201).json({ratings});
    } catch (error) {
        return res.status(500).json({error});
    }   
}

module.exports = {
    createRating,
    getAllRatings
}