const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
},{timestamps: true})

const Review = mongoose.model('reviews', schema);

module.exports = Review;