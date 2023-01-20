import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import stampAPI from '../services/stampAPI';

export const getStamps = createAsyncThunk(
    'stamp/getStamps',
    async (request, thunkAPI) => {
        try {
            const response = await stampAPI.getStamps(request);
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const updateStamp = createAsyncThunk(
    'stamp/updateStamp',
    async (request, thunkAPI) => {
        try {
            const response = await stampAPI.updateStamp(request);
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    stamps: [],
};

const stampSlice = createSlice({
    name: 'stamp',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getStamps.fulfilled, (state, action) => {
                state.stamps = action.payload.data;
            })
            .addCase(updateStamp.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.stamps.find(
                    (stamp) => stamp.mountainId == data.mountainId
                ).flag = data.flag;
            })
            .addDefaultCase((state, action) => {});
    },
});

export const selectStampsByRegion = (state, regionType) => {
    return state.stamps.filter((stamp) => stamp.regionType == regionType);
};

export const selectFlagCount = (state) => {
    return state.stamps.filter((stamp) => stamp.flag == true).length;
};

export const selectFlagCountByRegion = (state, regionType) => {
    return state.stamps.filter(
        (stamp) => stamp.regionType == regionType && stamp.flag == true
    ).length;
};

export default stampSlice.reducer;
