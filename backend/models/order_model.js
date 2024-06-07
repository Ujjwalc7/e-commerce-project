const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
      },
    ],
    orderDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
    paymentDetails: {
      paymentMethod: {
        type: String,
      },
      transactionId: {
        type: String,
      },
      paymentId: {
        type: String,
      },
      paymentStatus: {
        type: String,
        default: "pending",
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDiscountedPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    totalItem: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", schema);

module.exports = Order;
