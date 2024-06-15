import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        order: orderReducer,
    }
});

export default store;