import { createSlice } from '@reduxjs/toolkit';

const LAT = 37,
    LNG = 126;

const initialState = {
    curPosition: {
        isMarkerShow: true,
        latitude: LAT,
        longitude: LNG,
        altitude: 0,
        minAltitude: 10000,
        maxAltitude: 0,
        distance: 0,
        routeCoords: [],
        prevLatLng: {},
    },
    startPosition: {
        isMarkerShow: true,
        latitude: LAT,
        longitude: LNG,
    },
    endPosition: {
        isMarkerShow: false,
        latitude: LAT,
        longitude: LNG,
    },
};

const hikingSlice = createSlice({
    name: 'hiking',
    initialState,
    reducers: {
        setCurPosition: (state) => {},
        setStartPosition: (state) => {},
        setEndPosition: (state) => {},
        showEndPosition: (state) => {},
        showStartPosition: (state) => {},
        hideCurPosition: (state) => {},
    },
});

export const {} = hikingSlice.actions;
export default hikingSlice.reducer;
