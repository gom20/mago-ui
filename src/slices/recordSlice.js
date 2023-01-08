import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import recordAPI from '../services/recordAPI';

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
    const date = startDate.getDate();
    const weekday = WEEKDAY[startDate.getDay()];

    const endDate = new Date(endDatetime);
    const secondDiff = Math.abs(endDate - startDate) / 1000;
    const totalMinute = Math.ceil((secondDiff % 3600) / 60);
    let totalHour = Math.round(secondDiff / 3600);

    let startHour = startDate.getHours();
    startHour = startHour % 12 ? startHour % 12 : 12;
    const startAmpm = startHour >= 12 ? '오후' : '오전';
    const startMinute = startDate.getMinutes();

    let endHour = endDate.getHours();
    endHour = endHour % 12 ? endHour % 12 : 12;
    const endAmpm = startHour >= 12 ? '오후' : '오전';
    const endMinute = endDate.getMinutes();

    return {
        year: year,
        month: month,
        date: date,
        weekday: weekday,
        totalHour: totalHour,
        totalMinute: totalMinute,
        startHour: startHour,
        startMinute: startMinute,
        startAmpm: startAmpm,
        endHour: endHour,
        endMinute: endMinute,
        endAmpm: endAmpm,
    };
};

const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
};

export const createRecord = createAsyncThunk(
    'record/createRecord',
    async (request, thunkAPI) => {
        try {
            const response = await recordAPI.createRecord(request);
            console.error(response);
            response.data.dateTime = parseDatetime(
                response.data.startDatetime,
                response.data.endDatetime
            );
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

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

            const groupingData = groupBy(response.data, 'groupId');
            let result = [];
            Object.entries(groupingData).forEach(([key, value]) => {
                result.push({
                    groupId: key,
                    groupData: value,
                });
            });
            response.recordsByMonth = result;
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    records: [],
    recordsByMonth: [],
};

const recordSlice = createSlice({
    name: 'record',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.fulfilled, (state, action) => {
                state.records = state.records.concat(action.payload.data);
                state.recordsByMonth.forEach((group) => {
                    if (group.groupId == action.payload.data.groupId) {
                        group.grouData.push(action.payload.data);
                    }
                });
            })
            .addCase(createRecord.rejected, (state, action) => {
                // state.record = {};
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.records = action.payload.data;
                state.recordsByMonth = action.payload.recordsByMonth;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.records = [];
            })
            .addDefaultCase((state, action) => {});
    },
});

export const selectAllRecords = (state) => state.records;

export const selectRecordById = (state, recordId) => {
    return state.records.find((record) => record.uid == recordId);
};

export default recordSlice.reducer;
