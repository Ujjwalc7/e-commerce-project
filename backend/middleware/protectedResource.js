require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const mongoose = require('mongoose');
const UserModel = require('../models/user_model');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"user not logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if(err){
            return res.status(401).json({error:"user not logged in"}); 
        }
        const {userId} = payload;
        const user = await UserModel.findById(userId);
        if(user){
            req.user = user;
            next();
        }
    });
};
