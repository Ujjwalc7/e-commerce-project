import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import paymentReducer from "./slice/paymentSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        order: orderReducer,
        payment: paymentReducer
    }
});

export default store;