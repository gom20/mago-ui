import { createSlice } from '@reduxjs/toolkit';
import { AnimatedRegion } from 'react-native-maps';

const LATITUDE = 37.573898277022,
    LONGITUDE = 126.9731314753,
    LATITUDE_DELTA = 0.04,
    LONGITUDE_DELTA = 0.05;

const initialState = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    routeCoordinates: [],
    distanceTravelled: 0,
    coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }),
    prevLatLng: {},
};

const positionSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {
        setPosition: (state, action) => {
            return {
                latitude: action.payload.latitude
                    ? action.payload.latitude
                    : state.latitude,
                longitude: action.payload.longitude
                    ? action.payload.longitude
                    : state.longitude,
                routeCoordinates: action.payload.routeCoordinates
                    ? action.payload.routeCoordinates
                    : state.routeCoordinates,
                distanceTravelled: action.payload.distanceTravelled
                    ? action.payload.distanceTravelled
                    : state.distanceTravelled,
                coordinate: action.payload.coordinate
                    ? action.payload.coordinate
                    : state.coordinate,
            };
        },
    },
});

const { reducer, actions } = positionSlice;

export const { setPosition } = actions;
export default positionSlice.reducer;
