import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../services/authAPI';
import memberAPI from '../services/memberAPI';
import util from '../utils/util';

export const signup = createAsyncThunk(
    'auth/signup',
    async (request, thunkAPI) => {
        try {
            return await memberAPI.signup(request);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const withdraw = createAsyncThunk(
    'auth/withdraw',
    async (request, thunkAPI) => {
        try {
            return await memberAPI.withdraw(request);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (request, thunkAPI) => {
        try {
            return await memberAPI.updatePassword(request);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const sendTempPassword = createAsyncThunk(
    'auth/sendTempPassword',
    async (request, thunkAPI) => {
        try {
            return await memberAPI.sendTempPassword(request);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.login(request);
            response.data.tokenExp = util.parseJwt(
                response.data.accessToken
            ).exp;
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (request, thunkAPI) => {
        try {
            const { accessToken, refreshToken } = thunkAPI.getState().auth;
            return await authAPI.logout({ accessToken, refreshToken });
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const refresh = createAsyncThunk(
    'auth/refresh',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.refreshToken(request);
            response.data.tokenExp = util.parseJwt(
                response.data.accessToken
            ).exp;
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const sendVerificationEmail = createAsyncThunk(
    'auth/sendVerificationEmail',
    async (request, thunkAPI) => {
        try {
            return await authAPI.sendVerificationEmail(request);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const isVerifiedEmail = createAsyncThunk(
    'auth/isVerifiedEmail',
    async (request, thunkAPI) => {
        try {
            return await authAPI.isVerifiedEmail(request);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    isLogin: false,
    accessToken: null,
    refreshToken: null,
    tokenExp: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLogin = true;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
                state.tokenExp = action.payload.data.tokenExp;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogin = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLogin = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLogin = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
                state.user = null;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
                state.tokenExp = action.payload.data.tokenExp;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
            })
            .addCase(withdraw.fulfilled, (state, action) => {
                state = initialState;
            })
            .addCase(withdraw.rejected, (state, action) => {})
            .addDefaultCase((state, action) => {});
    },
});

export default authSlice.reducer;
