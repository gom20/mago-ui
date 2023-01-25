import { createSlice } from '@reduxjs/toolkit';
import haversine from 'haversine';

const LAT = 37.574187,
    LNG = 126.976882,
    DELTA_DOWN_LIMIT = 0.0004,
    DELTA_UP_LIMIT = 6.25;

const initialState = {
    curPosition: {
        latitude: LAT,
        longitude: LNG,
        altitude: 0,
        minAltitude: 10000,
        maxAltitude: 0,
        distance: 0,
        routeCoords: [],
        prevLatLng: {},
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    startPosition: {
        latitude: LAT,
        longitude: LNG,
    },
    breakInfo: {
        totalTime: 0,
        startTime: 0,
        endTime: 0,
    },
    deltaInfo: {
        downLimit: false,
        upLimit: false,
    },
};

const calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng, { unit: 'kilometer' }) || 0;
};

const hikingSlice = createSlice({
    name: 'hiking',
    initialState,
    reducers: {
        resetHiking: (state) => {
            Object.assign(state, initialState);
        },
        setCurPosition: (state, action) => {
            const payload = action.payload;
            state.curPosition.latitude = payload.latitude;
            state.curPosition.longitude = payload.longitude;
            state.curPosition.altitude = payload.altitude;
            state.curPosition.minAltitude = Math.min(
                state.curPosition.minAltitude,
                payload.altitude
            );
            state.curPosition.maxAltitude = Math.max(
                state.curPosition.maxAltitude,
                payload.altitude
            );

            const newLat = payload.latitude;
            const newLng = payload.longitude;
            const newLatLng = { latitude: newLat, longitude: newLng };

            state.curPosition.routeCoords =
                state.curPosition.routeCoords.concat(newLatLng);
            state.curPosition.distance =
                state.curPosition.distance +
                calcDistance(state.curPosition.prevLatLng, newLatLng);
            state.curPosition.prevLatLng = newLatLng;
        },
        setStartPosition: (state, action) => {
            const payload = action.payload;
            state.startPosition.latitude = payload.latitude;
            state.startPosition.longitude = payload.longitude;
        },
        startBreak: (state, action) => {
            state.breakInfo.startTime = action.payload;
        },
        endBreak: (state, action) => {
            state.breakInfo.endTime = action.payload;
            state.breakInfo.totalTime =
                state.breakInfo.totalTime +
                (action.payload - state.breakInfo.startTime);
        },
        incrementDelta: (state) => {
            if (!state.deltaInfo.upLimit) {
                state.deltaInfo.downLimit = false;
                state.curPosition.latitudeDelta =
                    state.curPosition.latitudeDelta * 5;
                state.curPosition.longitudeDelta =
                    state.curPosition.longitudeDelta * 5;
                if (state.curPosition.latitudeDelta * 5 > DELTA_UP_LIMIT) {
                    state.deltaInfo.upLimit = true;
                }
            }
        },
        decrementDelta: (state) => {
            if (!state.deltaInfo.downLimit) {
                state.deltaInfo.upLimit = false;
                state.curPosition.latitudeDelta =
                    state.curPosition.latitudeDelta / 5;
                state.curPosition.longitudeDelta =
                    state.curPosition.longitudeDelta / 5;
                if (state.curPosition.latitudeDelta / 5 < DELTA_DOWN_LIMIT) {
                    state.deltaInfo.downLimit = true;
                }
            }
        },
    },
});

export const {
    resetHiking,
    setCurPosition,
    setStartPosition,
    incrementBreakTime,
    startBreak,
    endBreak,
    resetBreak,
    incrementDelta,
    decrementDelta,
} = hikingSlice.actions;
export default hikingSlice.reducer;
