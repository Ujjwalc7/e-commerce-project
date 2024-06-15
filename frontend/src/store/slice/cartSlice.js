import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

    },
    extraReducers: (builder) => {
        
    }
});

export default cartSlice.reducer;