import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../apis/authAPI';

const user = {};

export const signup = createAsyncThunk(
    'auth/signup',
    async (reqData, thunkAPI) => {
        try {
            const response = await authAPI.signup(reqData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (reqData, thunkAPI) => {
        try {
            const response = await authAPI.login(reqData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await authAPI.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addDefaultCase((state, action) => {});
    },
});

export default authSlice.reducer;
