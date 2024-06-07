const express = require('express');
const cors = require('cors');
const PORT = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const Cart = require('./models/cart_model');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected"))
.catch(err=>console.log(err));
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth',require('./routes/auth_route'));
app.use('/api/users',require('./routes/user_routes'));
app.use('/api/products',require('./routes/product_route'));
app.use('/api/admin/products',require('./routes/adminProduct_route'));
app.use('/api/cart',require('./routes/cart_route'));
app.use('/api/cart_items',require('./routes/cartItem_route'));
app.use('/api/orders',require('./routes/order_route'));
app.use('/api/admin/orders',require('./routes/adminOrder_route'));
app.use('/api/reviews',require('./routes/review_route'));
app.use('/api/ratings',require('./routes/rating_route'));
app.use('/api/payments',require('./routes/payment_route'));







app.listen(PORT,()=>console.log("Server listening on port: " + PORT));
