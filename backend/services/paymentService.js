const razorpay = require('../config/razorpayClient');
const orderService = require('./order_service');

const createPaymentLink = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId); //find the order to generate the payment link

        // create the payment link request
        const paymentLinkRequest = {
            amount: order.totalDiscountedPrice*100,
            currency: "INR",
            customer: {
                name: order.user.firstName + " " + order.user.lastName,
                contact: order.user.phoneNumber,
                email: order.user.email
            },
            notify: {
                sms: true,
                email: true,
            },
            reminder_enable: true,
            callback_url: `http://localhost:5173/payment/success?orderId=${orderId}`,
            callback_method: 'get',
        }

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest); //generate payment link
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;


        const resData = {
            paymentLinkId,
            payment_link_url,
        }
        return resData;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const updatePaymentInformation = async(reqData) => {

    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;

    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status === 'captured') {
            order.paymentDetails.paymentMethod = payment.method;
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.paymentStatus = 'COMPLETED';
            order.orderStatus = 'PLACED';
            await order.save();
            return order;
        }else{
            throw new Error('payment failed')
    }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }

}

module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}