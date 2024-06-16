import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPayment } from "../services/payment/createPayment";
import { updatePayment } from "../services/payment/updatePayment";
import { getOrderByIdThunk } from "./orderSlice";

export const createPaymentThunk = createAsyncThunk(
    'payment/createPaymentThunk', async ({orderId, jwt}) => {
        await createPayment(orderId, jwt);
    }
)

export const updatePaymentThunk = createAsyncThunk(
    'payment/updatePaymentThunk', async (reqData, {dispatch}) => {
        const resp = await updatePayment(reqData);
        dispatch(getOrderByIdThunk({orderId: resp._id, jwt: reqData.jwt}));
    }
)

const initialState = {};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
})

export default paymentSlice.reducer;