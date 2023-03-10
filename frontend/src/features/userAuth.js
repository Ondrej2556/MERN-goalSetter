import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

export const register = createAsyncThunk('user/register', async(userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);

    } catch (error) {
        const message =  error.response.data
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('user/logout', async () => {
    try {
        return await authService.logout()
    } catch (error) {
        console.log(error.message)
    }
})

export const userAuthSLice = createSlice({
    name: 'userAuth',
    initialState,
    reducers:  {
        reset: (state) => {
            state.message ="";
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            }) 
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isError= false;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(login.rejected, (state, action)=> {
                state.isError = true;
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user =null;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state,action) => {
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = userAuthSLice.actions;

export default userAuthSLice.reducer;