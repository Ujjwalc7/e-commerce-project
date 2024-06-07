const orderService = require('../services/order_service');

const createOrder = async (req, res) => {
    const user = req.user;
    try {
        const createdOrder = await orderService.createOrder(user, req.body);
        return res.status(201).json({createdOrder});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error});
    }
}

const findOrderById = async (req, res) => {
    const user = req.user;
    try {
        const order = await orderService.findOrderById(req.params.id);
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ error});
    }
}


const orderHistory = async (req, res) => {
    const user = req.user;
    try {
        const orderHistory = await orderService.usersOrderHistory(user._id);
        return res.status(201).json({ orderHistory});
    } catch (error) {
        return res.status(500).json({ error});
    }
}

module.exports = {
    createOrder,
    findOrderById,
    orderHistory
}