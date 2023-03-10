import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import goalService from './goalService';

const initialState = {
    goals: [],
    isLoading: false,
    isError: false,
    message: "",
}

export const getGoals = createAsyncThunk('goals/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().userAuth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createGoals = createAsyncThunk('goals/create', async (goalText, thunkAPI) => {
    try {
        const token = thunkAPI.getState().userAuth.user.token
        return await goalService.createGoals(goalText, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const deleteGoal = createAsyncThunk('goal/delete', async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().userAuth.user.token;
        return await goalService.deleteGoal(goalId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateGoal = createAsyncThunk('goal/update', async (goalToUpdate, thunkAPI) => {
    try {
        const token = thunkAPI.getState().userAuth.user.token;
        return await goalService.updateGoal(goalToUpdate, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers:{
        reset: (state) => initialState
   },extraReducers: (builder) => {
        builder
            .addCase(getGoals.pending,(state)=> {
                state.isLoading = true;
            })
            .addCase(getGoals.rejected,(state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(getGoals.fulfilled, (state,action) => {
                state.goals = action.payload;
                state.isLoading = false;
            })
            .addCase(createGoals.pending,(state)=> {
                state.isLoading = true;
            })
            .addCase(createGoals.rejected,(state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(createGoals.fulfilled, (state,action) => {
                state.goals = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteGoal.pending,(state)=> {
                state.isLoading = true;
            })
            .addCase(deleteGoal.rejected,(state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(deleteGoal.fulfilled, (state,action) => {
                state.isLoading = false;
                state.goals = state.goals.filter(goal => goal._id !== action.payload);
            })
            .addCase(updateGoal.pending,(state)=> {
                state.isLoading = true;
            })
            .addCase(updateGoal.rejected,(state,action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(updateGoal.fulfilled, (state,action) => {
                state.goals = action.payload;
                state.isLoading = false;
            })
   }
})

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;