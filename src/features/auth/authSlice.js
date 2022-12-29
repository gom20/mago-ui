import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from './authAPI';

export const signup = createAsyncThunk(
    'auth/signup',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.signup(request);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.login(request);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const sendPassword = createAsyncThunk(
    'auth/sendPassword',
    async (request, thunkAPI) => {
        try {
            const response = await authAPI.sendPassword(request);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = { isLogged: false, token: null, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            console.error('TEST');
            state.isLogged = false;
            state.token = null;
            state.user = null;
        },
    },
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
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogged = false;
                state.token = null;
                state.user = null;
            })
            .addDefaultCase((state, action) => {});
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
