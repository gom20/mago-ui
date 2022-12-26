import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
