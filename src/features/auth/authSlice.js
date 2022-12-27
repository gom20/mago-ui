import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const logout = createAsyncThunk(
    'auth/logout',
    async (request, thunkAPI) => {
        await authAPI.logout();
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

const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        console.error(user);
        console.error('??');
        console.error(JSON.parse(user));
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
};

user = {};
const initialState = user
    ? { isLogged: true, user }
    : { isLogged: false, user: null };

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
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogged = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLogged = false;
                state.user = null;
            })
            .addDefaultCase((state, action) => {});
    },
});

export default authSlice.reducer;
