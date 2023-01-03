import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const LOCATION_TASK_NAME = 'LOCATION_TASK_NAME';
let foregroundSubscription = null;

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        // console.error(error)
        return;
    }
    if (data) {
        // Extract location coordinates from data
        const { locations } = data;
        const location = locations[0];
        if (location) {
            console.log('Location in background', location.coords);
        }
    }
});

export default HikingScreen = () => {
    // Define position state: {latitude: number, longitude: number}
    const [position, setPosition] = useState(null);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 37,
                    longitude: 127,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={{
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                style={styles.mapContainer}
            ></MapView>
            <View style={styles.recordContainer}>
                <View styles={styles.buttonContainer}>
                    <CustomButton
                        // onPress={onLoginPressed}
                        text="일시정지"
                        iconType="pause"
                        bgColor="#F5F5F5"
                        textColor="#757575"
                        height={30}
                        fontSize={13}
                    />
                    <CustomButton
                        // onPress={onLoginPressed}
                        text="등산 완료하기"
                        iconType="check"
                        height={30}
                        fontSize={13}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 8,
        width: '100%',
        height: '50%',
    },
    recordContainer: {
        flex: 2,
        width: '100%',
        backgroundColor: 'red',
    },
    buttonContainer: {
        height: 300,
        backgroundColor: 'red',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'red',
    },
});
