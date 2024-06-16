import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserCart from "../services/cart/getUserCart";
import { addItemtoCart } from "../services/product/addItemtoCart";
import { deletCartItem } from "../services/product/deleteCartItem";

export const getUserCartThunk = createAsyncThunk(
    'cart/getUserCartThunk', async(jwt) => {
        const resp = await getUserCart(jwt);
        return resp;
    }
);

export const addItemToCartThunk = createAsyncThunk(
    'cart/addItemToCartThunk', async({body,jwt}) => {
        const resp = await addItemtoCart(body, jwt);
        return resp;
    }
);

export const deleteCartItemThunk = createAsyncThunk(
    'cart/deleteCartItemThunk', async({body,jwt}) => {
        const resp = await deletCartItem(body, jwt);
        return resp;
    }
);

const initialState = {
    loading: false,
    cart: null,
    cartItems : [],
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state)=>{
            state.cart = null;
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserCartThunk.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserCartThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.cart = action.payload;
            state.cartItems = action.payload.cartItems;
            state.error = null;
        }).addCase(getUserCartThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
        .addCase(addItemToCartThunk.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addItemToCartThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.cartItems = action.payload.cartItems;
            state.cart = action.payload;
            state.error = null;
        }).addCase(addItemToCartThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteCartItemThunk.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCartItemThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.cartItems = action.payload.cartItems;
            state.cart = action.payload;
            state.error = null;
        }).addCase(deleteCartItemThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
});
export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;