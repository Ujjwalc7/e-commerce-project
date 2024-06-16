import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import signUp from "../../store/services/auth/signup";
import login from "../../store/services/auth/login";
import getUserDetails from "../services/auth/getUserDetails";
import { getUserCartThunk } from "./cartSlice";
// import getUserById from "../../services/user/getUserById";
// import updateUserProfile from "../../services/user/updateUserProfile";


export const signUpThunk = createAsyncThunk(
    'auth/signUpThunk',async(body)=>{
        const resp = await signUp(body);
        return resp;
    }
)

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',async(body, {dispatch})=>{
        const resp = await login(body);
        if(resp){
            dispatch(getUserByJwtThunk(resp));
        }
        return resp;
    }
)

export const getUserByJwtThunk = createAsyncThunk(
    'auth/getUserByIdThunk',async(jwt, {dispatch})=>{
        const resp = await getUserDetails(jwt);
        dispatch(getUserCartThunk(jwt));
        return {user:resp.user, jwt: jwt};
    }
)


export const updateProfileDetailsThunk = createAsyncThunk(
    'auth/updateProfileDetailsThunk', async({formData, userId, jwt})=>{
        const resp = await updateUserProfile(formData, userId, jwt);
        return resp;
    }
)

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    token: null,
    loading: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        },
        logout: (state)=>{
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false;
            console.log('logout');
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(signUpThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        })
        .addCase(signUpThunk.fulfilled,(state, action)=>{
            state.loading = false;
            // state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        })
        .addCase(signUpThunk.rejected,(state, action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.error.message;
        })
        .addCase(loginThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        })
        .addCase(loginThunk.fulfilled,(state, action)=>{
            state.loading = false;
            state.error = null;
            state.token = action.payload;
            state.isAuthenticated = false;
        })
        .addCase(loginThunk.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
            state.isAuthenticated = false;
        })
        .addCase(getUserByJwtThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        })
        .addCase(getUserByJwtThunk.fulfilled,(state, action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            if(!state.token){
                state.token = action.payload.jwt;
            }
            state.isAuthenticated = true;
        })
        .addCase(getUserByJwtThunk.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
            state.isAuthenticated = false;
        })
        .addCase(updateProfileDetailsThunk.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfileDetailsThunk.fulfilled,(state, action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(updateProfileDetailsThunk.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }

});

export const { setUser, logout } = authSlice.actions;

export default  authSlice.reducer 