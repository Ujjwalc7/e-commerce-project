const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    size:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    discountedPrice:{
        type: Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }
},{timestamps: true})

const OrderItems = mongoose.model('orderItems', schema);

module.exports = OrderItems;