import {
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import haversine from 'haversine';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import CustomButton from '../../components/CustomButton';
import { hideLoading, showLoading } from '../../slices/loadingSlice';
import { createRecord } from '../../slices/recordSlice';
import { ModalContext } from '../../utils/ModalContext';

export default HikingScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [gpsFixed, setGpsFixed] = useState(true);

    // Stop Watch
    const stopwatchOffset = new Date();
    const { seconds, minutes, hours, start, pause } = useStopwatch({
        autoStart: false,
        offsetTimestamp: stopwatchOffset,
    });
    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Toggle Button
    const [isRecordRunning, setIsRecordRunning] = useState(true);
    const startedToggleButtonProps = {
        text: '일시정지',
        iconType: 'pause',
        bgColor: '#F5F5F5',
        color: '#000000',
    };
    const pausedToggleButtonProps = {
        text: '계속하기',
        iconType: 'play-arrow',
        bgColor: '#000000',
        color: '#FFFFFF',
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
        isShow: true,
        latitude: LATITUDE,
        longitude: LONGITUDE,
        altitude: ALTITUDE,
        minAltitude: 10000,
        maxAltitude: 0,
        routeCoords: [],
        distance: 0,
        prevLatLng: {},
    });

    const [startPosition, setStartPosition] = useState({
        isShow: true,
        latitude: LATITUDE,
        longitude: LONGITUDE,
    });

    const [finishPosition, setFinishPosition] = useState({
        isShow: false,
        latitude: LATITUDE,
        longitude: LONGITUDE,
    });

    //Hiking Record
    const [startDatetime, setStartDatetime] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const LOCATION_TASK_NAME = 'BACKGROUND-LOCATION-TASK';
    let markerRef = useRef();
    let mapViewRef = useRef();

    const onFinishPressed = async () => {
        adjustRegionForSnapshot();
        const tempMapViewRef = mapViewRef;
        const response = await showModal({
            message: '등산을 완료하겠습니까?',
            type: 'confirm',
            buttonTexts: ['취소', '완료'],
            async: true,
        });
        if (!response) {
            return;
        }

        setFinishPosition({
            isShow: true,
            latitude: position.latitude,
            longitude: position.longitude,
        });
        setPosition({
            ...position,
            isShow: false,
        });
        stopHiking();

        const snapshot = tempMapViewRef.takeSnapshot({
            format: 'png',
            quality: 0.5,
            result: 'file',
        });
        snapshot
            .then((uri) => {
                const _timestamp = (date) => {
                    date.setHours(date.getHours() + 9);
                    return date.toISOString().substring(0, 20);
                };
                dispatch(
                    createRecord({
                        email: user.email,
                        mountain: route.params.mountain,
                        startDatetime: _timestamp(startDatetime),
                        endDatetime: _timestamp(new Date()),
                        distance: position.distance,
                        minAltitude: position.minAltitude,
                        maxAltitude: position.maxAltitude,
                        imgPath: uri,
                    })
                )
                    .unwrap()
                    .then((response) => {
                        console.log(response);
                        navigation.navigate('나의 산 기록', {
                            screen: 'RecordDetail',
                            params: {
                                recordId: response.data.uid,
                            },
                        });
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const adjustRegionForSnapshot = () => {
        let coords = position.routeCoords;

        let sumLat = coords.reduce((a, c) => {
            return parseFloat(a) + parseFloat(c.latitude);
        }, 0);
        let sumLong = coords.reduce((a, c) => {
            return parseFloat(a) + parseFloat(c.longitude);
        }, 0);

        let avgLat = sumLat / coords.length || 0;
        let avgLong = sumLong / coords.length || 0;

        mapViewRef.animateToRegion({
            latitude: parseFloat(avgLat),
            longitude: avgLong,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        });
    };

    const onTogglePressed = () => {
        if (isRecordRunning) {
            stopHiking();
        } else {
            startHiking();
        }
    };

    const onGpsButtonPressed = () => {
        mapViewRef.animateToRegion(getMapRegion());
        setGpsFixed(true);
    };

    const startHiking = () => {
        if (!startDatetime) setStartDatetime(new Date());
        start();
        startBackgroundPositionUpdate();
        setToggleButtonProps(startedToggleButtonProps);
        setIsRecordRunning(true);
    };

    const stopHiking = () => {
        pause();
        stopBackgroundPositionUpdate();
        setToggleButtonProps(pausedToggleButtonProps);
        setIsRecordRunning(false);
    };

    const getMapRegion = () => ({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    const setCurrentPosition = async (response) => {
        const {
            coords: { latitude, longitude, altitude },
        } = response;
        setPosition({
            ...position,
            latitude: latitude,
            longitude: longitude,
            altitude: altitude,
        });

        setStartPosition({
            isShow: true,
            latitude: latitude,
            longitude: longitude,
        });
    };

    const setUpdatedPosition = (newPosition) => {
        const _calcDistance = (prevLatLng, newLatLng) => {
            return haversine(prevLatLng, newLatLng, { unit: 'meter' }) || 0;
        };
        const { latitude, longitude, altitude } = newPosition.coords;

        //새롭게 이동된 좌표
        const newCoord = { latitude, longitude };
        if (markerRef && markerRef.current) {
            markerRef.current.animateMarkerToCoordinate(newCoord, 500);
        }

        // 좌표값 갱신하기
        setPosition((prev) => ({
            ...position,
            latitude,
            longitude,
            altitude,
            minAltitude: Math.min(prev.minAltitude, altitude),
            maxAltitude: Math.max(prev.maxAltitude, altitude),
            routeCoords: [...prev.routeCoords, newCoord],
            distance: prev.distance + _calcDistance(prev.prevLatLng, newCoord), // 이동거리
            prevLatLng: newCoord,
        }));
    };

    const startBackgroundPositionUpdate = async () => {
        const { granted } = await Location.getBackgroundPermissionsAsync();
        if (!granted) {
            console.log('location tracking denied');
            return;
        }
        const isTaskDefined = await TaskManager.isTaskDefined(
            LOCATION_TASK_NAME
        );
        if (!isTaskDefined) {
            console.log('Task is not defined');
            return;
        }
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        );
        if (hasStarted) {
            console.log('Already started');
            return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Highest,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
                notificationTitle: 'Location',
                notificationBody: 'Location tracking in background',
                notificationColor: '#fff',
            },
        });
    };

    const stopBackgroundPositionUpdate = async () => {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        );
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
            console.log('Location tacking stopped');
        }
    };

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
            return;
        }
        if (data) {
            const { locations } = data;
            const location = locations[0];
            if (location) {
                setUpdatedPosition(location);
                console.log('Location in background', location.coords);
            }
        }
    });

    const confirmBackAction = async () => {
        const response = await showModal({
            async: true,
            message: '등산을 취소하시겠습니까?',
            type: 'confirm',
            buttonTexts: ['아니오', '네'],
        });
        console.log(response);
        if (!response) return;
        console.log(response);
        navigation.navigate('MainTab');
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = async () => {
                const response = await showModal({
                    async: true,
                    message: '등산을 취소하시겠습니까?',
                    type: 'confirm',
                    buttonTexts: ['아니오', '네'],
                });
                console.log(response);
                if (!response) return;
                console.log(response);
                navigation.navigate('MainTab');
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    onPress={confirmBackAction}
                    style={{
                        marginLeft: '17%',
                    }}
                />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const requestPermissions = async () => {
            const foreground =
                await Location.requestForegroundPermissionsAsync();
            if (foreground.granted) {
                const background =
                    await Location.requestBackgroundPermissionsAsync();
                return background.granted;
            }
            return false;
        };

        requestPermissions()
            .then(async (granted) => {
                if (granted) {
                    console.log('위치 권한 요청 허용');
                    dispatch(showLoading());
                    Location.getCurrentPositionAsync()
                        .then((resp) => {
                            console.log('현재 위치 로드 완료');
                            setCurrentPosition(resp);
                            dispatch(hideLoading());
                            startHiking();
                        })
                        .catch((error) => {
                            showModal({
                                message: '위치정보를 가져올 수 없습니다.',
                            });
                        });
                } else {
                    console.log('위치 권한 요청 거부');
                    await showModal({
                        message:
                            '위치 엑세스 권한을 허용하셔야 해당 기능을 사용할 수 있습니다',
                        async: true,
                    });
                    navigation.navigate('MainTab');
                }
            })
            .catch(async (error) => {
                console.log('위치 권한 요청 에러');
                await showModal({
                    message: '위치 엑세스 권한 정보를 받지 못하였습니다.',
                    async: true,
                });
                setMapLoading(false);
                navigation.navigate('MainTab');
            });

        return () => {
            console.log('Component Unmount');
            stopBackgroundPositionUpdate();
        };
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                ref={(mapView) => {
                    mapViewRef = mapView;
                }}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={getMapRegion()}
                style={styles.mapContainer}
                onMapLoaded={() => console.log('MAP LOADED')}
                onPress={() => console.log('On Press')}
                onPanDrag={() => {
                    if (gpsFixed) {
                        setGpsFixed(false);
                    }
                }}
            >
                {startPosition.isShow && (
                    <Marker
                        coordinate={{
                            latitude: startPosition.latitude,
                            longitude: startPosition.longitude,
                        }}
                        title="시작지점"
                    ></Marker>
                )}
                {position.isShow && (
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }}
                    >
                        <MaterialIcons
                            name="stop-circle"
                            size={16}
                            color="red"
                            style={{
                                width: 16,
                                height: 16,
                                borderRadius: 16 / 2,
                                overflow: 'hidden',
                                borderWidth: 3,
                                borderColor: '#fff',
                            }}
                        />
                    </Marker.Animated>
                )}
                {finishPosition.isShow && (
                    <Marker
                        coordinate={{
                            latitude: finishPosition.latitude,
                            longitude: finishPosition.longitude,
                        }}
                        title="종료지점"
                    >
                        <FontAwesome5
                            name="flag-checkered"
                            size={24}
                            color="black"
                        />
                    </Marker>
                )}

                <Polyline
                    coordinates={position.routeCoords}
                    strokeWidth={5}
                    strokeColor="#FF0000"
                />
            </MapView>
            <View style={styles.gpsButton}>
                <MaterialIcons
                    name={gpsFixed ? 'gps-fixed' : 'gps-not-fixed'}
                    size={23}
                    color={gpsFixed ? '#0DD36E' : '#cef2e0'}
                    onPress={onGpsButtonPressed}
                />
            </View>

            <View style={styles.contentContainer}>
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
                                size={22}
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
                                size={15}
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
                        bgColor={toggleButtonProps.bgColor}
                        textColor={toggleButtonProps.color}
                        width={'40%'}
                        height={43}
                        fontSize={14}
                    />
                    <CustomButton
                        onPress={onFinishPressed}
                        text="등산 완료하기"
                        iconType="check"
                        height={43}
                        width={'55%'}
                        fontSize={14}
                    />
                </View>
            </View>
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
        width: '100%',
        height: '73%',
    },
    gpsButton: {
        position: 'absolute',
        top: '64%',
        right: '5%',
        width: 45,
        height: 45,
        elevation: 4,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        height: '28%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 4,
        position: 'absolute',
        bottom: 0,
    },
    timerContainer: {
        flex: 1,
        alignSelf: 'center',
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
        fontSize: 13,
        color: '#949494',
    },
    value: {
        fontSize: 17,
        color: '#949494',
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
