import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import recordAPI from '../services/recordAPI';

export const createRecord = createAsyncThunk(
    'record/createRecord',
    async (request, thunkAPI) => {
        try {
            return await recordAPI.createRecord(request);
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const parseDatetime = (startDatetime, endDatetime) => {
    const WEEKDAY = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ];
    const startDate = new Date(startDatetime);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDay() + 1;
    const weekday = WEEKDAY[startDate.getDay()];

    const endDate = new Date(endDatetime);
    const secondDiff = (endDate - startDate) / 1000;
    const minute = Math.round((secondDiff % 3600) / 60);
    let hour = Math.round(secondDiff / 3600);
    const ampm = hour >= 12 ? '오후' : '오전';
    hour = hour % 12 ? hour % 12 : 12;

    return {
        year: year,
        month: month,
        day: day,
        weekday: weekday,
        ampm: ampm,
        hour: hour,
        minute: minute,
    };
};

function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
}

export const getRecords = createAsyncThunk(
    'record/getRecords',
    async (request, thunkAPI) => {
        try {
            const response = await recordAPI.getRecords(request);
            response.data.forEach((item) => {
                item.dateTime = parseDatetime(
                    item.startDatetime,
                    item.endDatetime
                );
                item.groupId = item.dateTime.year + '' + item.dateTime.month;
            });
            const parsedData = groupBy(response.data, 'groupId');
            let result = [];
            Object.entries(parsedData).forEach(([key, value]) => {
                result.push({
                    groupId: key,
                    groupData: value,
                });
            });
            response.data = result;
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    records: [],
};

const recordSlice = createSlice({
    name: 'record',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.fulfilled, (state, action) => {
                // state.record = action.payload.data;
            })
            .addCase(createRecord.rejected, (state, action) => {
                // state.record = {};
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.records = action.payload.data;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.records = [];
            })
            .addDefaultCase((state, action) => {});
    },
});

export default recordSlice.reducer;
