const paymentService = require('../services/paymentService');

const createPaymentLink = async(req, res) => {
    try {
        const paymentLink = await paymentService.createPaymentLink(req.params.id);
        return res.status(200).json(paymentLink);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updatePaymentInformation = async(req, res) => {
    try {
        const resp = await paymentService.updatePaymentInformation(req.query);
        return res.status(200).json(resp);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}