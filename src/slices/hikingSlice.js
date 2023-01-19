import { createSlice } from '@reduxjs/toolkit';
import haversine from 'haversine';

const LAT = 37.574187,
    LNG = 126.976882;

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
};

const calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng, { unit: 'meter' }) || 0;
};

const hikingSlice = createSlice({
    name: 'hiking',
    initialState,
    reducers: {
        resetPositions: (state) => {
            state.curPosition = initialState.curPosition;
            state.startPosition = initialState.startPosition;
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
    },
});

export const { resetPositions, setCurPosition, setStartPosition } =
    hikingSlice.actions;
export default hikingSlice.reducer;
