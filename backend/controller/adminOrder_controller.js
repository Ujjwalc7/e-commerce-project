const orderService = require('../services/order_service');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const confirmedOrders = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.confirmedOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const shipOrders = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const orders = await orderService.shipOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deliverOrders = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const orders = await orderService.deliverOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const cancelledOrders = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const orders = await orderService.cancelledOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteOrderd = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await orderService.deleteOrder(orderId);
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllOrders,
    confirmedOrders,
    shipOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrderd
}