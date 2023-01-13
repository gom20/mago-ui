import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import recordAPI from '../services/recordAPI';
import util from '../utils/util';

export const createRecord = createAsyncThunk(
    'record/createRecord',
    async (request, thunkAPI) => {
        try {
            const response = await recordAPI.createRecord(request);
            response.data.dateTime = util.parseDatetime(
                response.data.startDatetime,
                response.data.endDatetime
            );
            response.data.groupId =
                response.data.dateTime.year + '' + response.data.dateTime.month;
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getRecords = createAsyncThunk(
    'record/getRecords',
    async (params, thunkAPI) => {
        try {
            const response = await recordAPI.getRecords({ params });
            response.data.content.forEach((item) => {
                item.dateTime = util.parseDatetime(
                    item.startDatetime,
                    item.endDatetime
                );
                item.groupId = item.dateTime.year + '' + item.dateTime.month;
                item.selected = false;
            });
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const deleteRecords = createAsyncThunk(
    'record/deleteRecords',
    async (request, thunkAPI) => {
        try {
            const response = await recordAPI.deleteRecords(request);
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
    totalElements: 0,
    pageNumber: 0,
    last: true,
};

const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        reset(state) {
            Object.assign(state, initialState);
        },
        select(state, action) {
            //             var found = obj.find(e => e.name === 'John');
            // console.log(found);

            console.log(action.payload);
            // records.find((record) => record.uid)

            state.records.map((record) => {
                if (record.uid == action.payload.uid) {
                    record.selected = action.payload.selected;
                    console.log(record);
                }
            });
            Object.assign(state, state);
            // record.selected = action.payload.selected;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.records = [data].concat(state.records);
                if (state.recordsByMonth[0].groupId == data.groupId) {
                    state.recordsByMonth[0].groupData.unshift(data);
                } else {
                    state.recordsByMonth.unshift({
                        groupId: data.groupId,
                        groupData: data,
                    });
                }
            })
            .addCase(createRecord.rejected, (state, action) => {
                // state.record = {};
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.records = state.records
                    .concat(data.content)
                    .filter(
                        (value, index, self) =>
                            index === self.findIndex((o) => o.uid === value.uid)
                    );

                let recordsByMonth = [];
                Object.entries(util.groupBy(state.records, 'groupId')).forEach(
                    ([key, value]) => {
                        recordsByMonth.push({
                            groupId: key,
                            groupData: value,
                        });
                    }
                );
                state.recordsByMonth = recordsByMonth;
                state.totalElements = data.totalElements;
                state.pageNumber =
                    state.pageNumber <= data.pageable.pageNumber
                        ? data.pageable.pageNumber
                        : state.pageNumber;

                state.last =
                    state.pageNumber <= data.pageable.pageNumber
                        ? data.last
                        : state.last;
            })
            .addCase(getRecords.rejected, (state, action) => {
                // state.records = [];
            })
            .addCase(deleteRecords.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.records = state.records.filter(
                    (record) => !data.ids.includes(record.uid)
                );
                let recordsByMonth = [];
                Object.entries(util.groupBy(state.records, 'groupId')).forEach(
                    ([key, value]) => {
                        recordsByMonth.push({
                            groupId: key,
                            groupData: value,
                        });
                    }
                );
                state.recordsByMonth = recordsByMonth;
                state.totalElements = state.totalElements - data.ids.length;
            })
            .addCase(deleteRecords.rejected, (state, action) => {})
            .addDefaultCase((state, action) => {});
    },
});

export const selectAllRecords = (state) => state.records;

export const selectRecordById = (state, recordId) => {
    return state.records.find((record) => record.uid == recordId);
};

export const { reset, select } = recordSlice.actions;
export default recordSlice.reducer;
