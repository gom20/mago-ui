import {
    FontAwesome5,
    Fontisto,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import haversine from 'haversine';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useStopwatch } from 'react-timer-hook';
import CustomButton from '../../components/CustomButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import { ModalContext } from '../../utils/ModalContext';

export default TestScreen2 = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    // Stop Watch
    const stopwatchOffset = new Date();
    const { seconds, minutes, hours, isRunning, start, pause, reset } =
        useStopwatch({ autoStart: false, offsetTimestamp: stopwatchOffset });
    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Toggle Button
    const [isRecordRunning, setIsRecordRunning] = useState(true);
    const startedToggleButtonProps = {
        text: '일시정지',
        iconType: 'pause',
        color: '#F5F5F5',
    };
    const pausedToggleButtonProps = {
        text: '계속하기',
        iconType: 'play-arrow',
        color: '#FEE500',
    };
    const [toggleButtonProps, setToggleButtonProps] = useState(
        startedToggleButtonProps
    );

    // Modal
    const { showModal } = useContext(ModalContext);

    // Postion
    let LATITUDE = 37.573898277022,
        LONGITUDE = 126.9731314753,
        ALTITUDE = 0,
        LATITUDE_DELTA = 0.001,
        LONGITUDE_DELTA = 0.001;

    const [position, setPosition] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        altitude: ALTITUDE,
        routeCoords: [],
        distance: 0,
        prevLatLng: {},
    });

    const onFinishPressed = async () => {
        const response = await showModal({
            message: '완등을 축하합니다!\n나의 산을 기록하세요!',
            type: 'confirm',
            buttonTexts: ['홈으로', '오늘의 기록'],
            async: true,
        });
        if (response) {
            // left button
            navigation.navigate('MainTab');
        } else {
            navigation.navigate('MainTab');
        }
    };

    const onTogglePressed = () => {
        if (isRecordRunning) {
            pause();
            setToggleButtonProps(pausedToggleButtonProps);
        } else {
            start();
            setToggleButtonProps(startedToggleButtonProps);
        }
        setIsRecordRunning(!isRecordRunning);
    };

    const getMapRegion = () => ({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    const calcDistance = (prevLatLng, newLatLng) => {
        return haversine(prevLatLng, newLatLng, { unit: 'meter' }) || 0;
    };

    const fetchPosition = async () => {
        setLoading(true);
        try {
            await Location.requestForegroundPermissionsAsync();
            const {
                coords: { latitude, longitude, altitude },
            } = await Location.getCurrentPositionAsync();
            setPosition({
                ...position,
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
            });
            setLoading(false);
            watchPosition();
            start();
        } catch (e) {
            setLoading(false);
            showModal({
                message: '위치정보를 가져올 수 없습니다.',
            });
        }
    };

    let markerRef = useRef();
    const watchPosition = () => {
        // 실시간으로 위치 변화 감지
        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 5000,
                distanceInterval: 5,
            },
            (newPosition) => {
                console.error('watchPosition');
                const { latitude, longitude, altitude } = newPosition.coords;

                //새롭게 이동된 좌표
                const newCoord = {
                    latitude,
                    longitude,
                };

                if (markerRef && markerRef.current) {
                    markerRef.current.animateMarkerToCoordinate(newCoord, 500);
                }

                // 좌표값 갱신하기
                setPosition((prev) => ({
                    latitude,
                    longitude,
                    altitude,
                    routeCoords: [...prev.routeCoords, newCoord],
                    distance:
                        prev.distance + calcDistance(prev.prevLatLng, newCoord), // 이동거리
                    prevLatLng: newCoord,
                }));
            }
        );
    };

    useEffect(() => {
        fetchPosition();
    }, []);

    return (
        <View style={styles.container}>
            {!loading && (
                <MapView
                    showUserLocation
                    followUserLocation
                    loadingEnabled
                    region={getMapRegion()}
                    style={styles.mapContainer}
                >
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }}
                    >
                        <Fontisto
                            name="map-marker-alt"
                            size={24}
                            color="#FF0000"
                        />
                    </Marker.Animated>
                    <Polyline
                        coordinates={position.routeCoords}
                        strokeWidth={5}
                        strokeColor="#FF0000"
                    />
                </MapView>
            )}

            <View style={styles.contentContainer}>
                <Text>
                    위도: {position.latitude}, 경도: {position.longitude}, 거리:{' '}
                    {position.distance} 루트: {position.routeCoords.length}
                </Text>

                <View style={styles.timerContainer}>
                    <Text style={styles.timeText}>
                        {hourTime}:{minuteTime}:{secondTime}
                    </Text>
                </View>
                <View style={styles.recordContainer}>
                    <View style={styles.record}>
                        <View style={styles.label}>
                            <MaterialCommunityIcons
                                name="map-marker-distance"
                                size={30}
                                color="#949494"
                            />
                            <Text style={styles.labelText}>거리</Text>
                        </View>
                        <Text style={styles.value}>
                            {position.distance.toFixed(2)}m
                        </Text>
                    </View>

                    <View style={[styles.record, styles.altitudeRecord]}>
                        <View style={styles.label}>
                            <FontAwesome5
                                name="mountain"
                                size={24}
                                color="#949494"
                            />
                            <Text style={styles.labelText}>고도</Text>
                        </View>
                        <Text style={styles.value}>
                            {position.altitude.toFixed(2)}m
                        </Text>
                    </View>
                    <View style={styles.info}></View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={onTogglePressed}
                        text={toggleButtonProps.text}
                        iconType={toggleButtonProps.iconType}
                        bgColor={toggleButtonProps.color}
                        textColor="#757575"
                        width={'40%'}
                        height={30}
                        fontSize={13}
                    />
                    <CustomButton
                        onPress={onFinishPressed}
                        text="등산 완료하기"
                        iconType="check"
                        height={30}
                        width={'50%'}
                        fontSize={13}
                    />
                </View>
            </View>
            <LoadingIndicator loading={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
    },
    mapContainer: {
        // flex: 1,
        width: '100%',
        height: '70%',
    },
    contentContainer: {
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingVertical: '12%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
    },
    timerContainer: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    timeText: {
        fontSize: 30,
        fontWeight: '600',
    },
    recordContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    record: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        padding: '3%',
    },
    altitudeRecord: {
        justifyContent: 'flex-end',
    },
    label: {
        marginRight: '13%',
    },
    labelText: {
        fontSize: 15,
        color: '#949494',
    },
    value: {
        fontSize: 22,
        color: '#949494',
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
