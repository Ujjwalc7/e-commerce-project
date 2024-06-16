const cartService = require('../services/cartItem_service');

const updateCartItem = async(req, res) => {
    const user = req.user; 
    try {
        const updatedCartItem = await cartService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).json({updatedCartItem});
    } catch (error) {
        return res.status(500).json({error});
    }
}

const removeCartItem = async(req, res) => {
    const user = req.user; 
    const cartItemsIds = req.body;
    try {
        const updatedCart = await cartService.removeCartItem(user._id, cartItemsIds);
        return res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json({error});
    }
}

module.exports = {
    updateCartItem,
    removeCartItem
}