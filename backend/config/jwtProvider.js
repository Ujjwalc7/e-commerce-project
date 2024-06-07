require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");


const genrateToken = (userId) =>{
    const token = jwt.sign({userId}, SECRET_KEY,{expiresIn:"25m"});
    return token;
}

const getUserIdFromToken = (token) =>{
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
}

module.exports = {genrateToken, getUserIdFromToken}
