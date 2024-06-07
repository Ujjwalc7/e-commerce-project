const reviewService = require('../services/review_service');

const createReview = async(req, res) => {
    const user = req.user;
    try {
        const review = await reviewService.createReview(req.body, user);
        return response.status(201).json({review});
    } catch (error) {
        return res.status(500).json({error});
    }
}

const getAllReviews = async(req, res) => {
    const productId = req.params.productId;
    try {
        const reviews = await reviewService.getAllReviews(productId);
        return response.status(201).json({reviews});
    } catch (error) {
        return res.status(500).json({error});
    }   
}

module.exports = {
    createReview,
    getAllReviews
}