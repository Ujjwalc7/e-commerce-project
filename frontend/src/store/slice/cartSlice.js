import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserCart from "../services/cart/getUserCart";

export const getUserCartThunk = createAsyncThunk(
    'cart/getUserCartThunk', async(jwt) => {
        const resp = await getUserCart(jwt);
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
    }
});
export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;