import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../services/product/getAllProducts";
import { getProductById } from "../services/product/getProductById";

export const getAllProductsThunk = createAsyncThunk(
    'product/getAllProductsThunk', async (reqQuery) => {
        const resp = await getAllProducts(reqQuery);
        return resp;
    }
)

export const getProductByIdThunk = createAsyncThunk(
    'product/getProductByIdThunk', async (id) => {
        const resp = await getProductById(id);
        return resp;
    }
)

const initialState = {
    loading: false,
    product: null,
    products : {
        products:[]
    },
    error: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getAllProductsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = false;
        })
        .addCase(getAllProductsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        .addCase(getProductByIdThunk.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getProductByIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = false;
        })
        .addCase(getProductByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
});

export default productSlice.reducer;