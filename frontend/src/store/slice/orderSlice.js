import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../services/order/createOrder";
import { getOrderById } from "../services/order/getOrderById";

export const createOrderThunk = createAsyncThunk(
    'cart/createOrderThunk', async({body,jwt, navigate}) => {
        const resp = await createOrder(body, jwt);
        navigate(`/checkout/step/2?order_id=${resp._id}`,{search:`?order_id=${resp._id}`});
    }
);

export const getOrderByIdThunk = createAsyncThunk(
    'cart/getOrderByIdThunk', async({orderId,jwt}) => {
        const resp = await getOrderById(orderId, jwt);
        return resp;
    }
);

const initialState = {
    loading: false,
    order: null,
    orderItems : [],
    error: null,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrderThunk.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createOrderThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
        }).addCase(createOrderThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
        .addCase(getOrderByIdThunk.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getOrderByIdThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.order = action.payload;
            state.orderItems = action.payload.orderItems;
            state.error = null;
        }).addCase(getOrderByIdThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
});

export default orderSlice.reducer;