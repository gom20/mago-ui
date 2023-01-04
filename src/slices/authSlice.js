import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../services/authAPI';
import { Buffer } from 'buffer';

export const signup = createAsyncThunk(
    'auth/signup',
    async (request, thunkAPI) => {
        try {
            return await authAPI.signup(request);
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

export const login = createAsyncThunk(
    'auth/login',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.login(request);
            response.data.tokenExp = parseJwt(response.data.accessToken).exp;
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const sendPassword = createAsyncThunk(
    'auth/sendPassword',
    async (request, thunkAPI) => {
        try {
            return await authAPI.sendPassword(request);
        } catch (error) {
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
            return thunkAPI.rejectWithValue();
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.refreshToken(request);
            response.data.tokenExp = parseJwt(response.data.accessToken).exp;
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    isLogged: false,
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
            .addCase(signup.fulfilled, (state, action) => {
                state.isLogged = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLogged = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLogged = true;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
                state.tokenExp = action.payload.data.tokenExp;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogged = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLogged = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLogged = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
                state.user = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
                state.tokenExp = action.payload.data.tokenExp;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.tokenExp = null;
            })
            .addDefaultCase((state, action) => {});
    },
});

export default authSlice.reducer;
