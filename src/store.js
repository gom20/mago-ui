import { configureStore, combineReducers } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
