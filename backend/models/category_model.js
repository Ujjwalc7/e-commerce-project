const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength:50
    },
    level:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const Category = mongoose.model('categories', schema);

module.exports = Category;