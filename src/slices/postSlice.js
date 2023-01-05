import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postAPI from '../services/postAPI';

export const createPost = createAsyncThunk(
    'post/createPost',
    async (request, thunkAPI) => {
        try {
            return await postAPI.createPost(request);
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async (request, thunkAPI) => {
        try {
            return await postAPI.getPosts(request);
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    post: {},
    postList: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                state.post = action.payload.response.data;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.post = {};
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.postList = action.payload.response.data;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.postList = [];
            })
            .addDefaultCase((state, action) => {});
    },
});

export default postSlice.reducer;
