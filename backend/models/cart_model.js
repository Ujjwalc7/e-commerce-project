const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartItems',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        default:0
    },
    totalItem: {
        type: Number,
        required: true,
        default:0
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
        default:0
    },
    discount: {
        type: Number,
        required: true,
        default:0
    }
},{timestamps: true});

const Cart = mongoose.model("cart", schema);

module.exports = Cart;