import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import recordAPI from '../services/recordAPI';
import util from '../utils/util';

export const createRecord = createAsyncThunk(
    'record/createRecord',
    async (request, thunkAPI) => {
        try {
            const response = await recordAPI.createRecord(request);
            response.data.dateTime = util.parseDatetime(response.data);
            response.data.groupId = response.data.dateTime.groupId;
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
                item.dateTime = util.parseDatetime(item);
                item.groupId = item.dateTime.groupId;
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
            const { recordsToDelete } = thunkAPI.getState().record;
            const response = await recordAPI.deleteRecords({
                ids: recordsToDelete,
            });
            return response;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    records: [],
    recordGroups: [],
    totalCount: 0,
    page: 0,
    last: true,
    deleteMode: false,
    recordsToDelete: [],
};

const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        resetRecord(state) {
            Object.assign(state, initialState);
        },
        enableDelete(state) {
            state.deleteMode = true;
        },
        disableDelete(state) {
            state.deleteMode = false;
            state.recordsToDelete = [];
        },
        selectRecordToDel(state, action) {
            state.recordsToDelete = state.recordsToDelete.concat([
                action.payload,
            ]);
        },
        selectAllRecordToDel(state) {
            state.recordsToDelete = state.records.map((record) => record.uid);
        },
        unselectRecordToDel(state, action) {
            state.recordsToDelete = state.recordsToDelete.filter(
                (uid) => uid !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.records.unshift(data);
                if (
                    state.recordGroups.length > 0 &&
                    state.recordGroups[0].groupId == data.groupId
                ) {
                    state.recordGroups[0].groupData.unshift(data);
                } else {
                    state.recordGroups = [
                        {
                            groupId: data.groupId,
                            groupData: data,
                        },
                    ];
                }
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.records = state.records
                    .concat(data.content)
                    .filter(
                        (value, index, self) =>
                            index === self.findIndex((o) => o.uid === value.uid)
                    );

                let recordGroups = [];
                Object.entries(util.groupBy(state.records, 'groupId')).forEach(
                    ([key, value]) => {
                        recordGroups.push({
                            groupId: key,
                            groupData: value,
                        });
                    }
                );
                state.recordGroups = recordGroups;
                state.totalCount = data.totalElements;
                if (state.page <= data.pageable.pageNumber) {
                    state.page = data.pageable.pageNumber;
                    state.last = data.last;
                }
            })
            .addCase(deleteRecords.fulfilled, (state, action) => {
                const data = action.payload.data;
                state.records = state.records.filter(
                    (record) => !data.ids.includes(record.uid)
                );
                let recordGroups = [];
                Object.entries(util.groupBy(state.records, 'groupId')).forEach(
                    ([key, value]) => {
                        recordGroups.push({
                            groupId: key,
                            groupData: value,
                        });
                    }
                );
                state.recordGroups = recordGroups;
                state.totalCount = state.totalCount - data.ids.length;
            })
            .addDefaultCase((state, action) => {});
    },
});

export const selectAllRecords = (state) => state.records;

export const selectRecordById = (state, recordId) => {
    return state.records.find((record) => record.uid == recordId);
};

export const {
    resetRecord,
    enableDelete,
    disableDelete,
    selectAllRecordToDel,
    selectRecordToDel,
    unselectRecordToDel,
    resetRecordToDel,
} = recordSlice.actions;
export default recordSlice.reducer;
