import {
    FontAwesome5,
    Fontisto,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import haversine from 'haversine';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import CustomButton from '../../components/CustomButton';
import { createRecord } from '../../slices/recordSlice';
import { ModalContext } from '../../utils/ModalContext';

export default HikingScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

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
        minAltitude: 10000,
        maxAltitude: 0,
        routeCoords: [],
        distance: 0,
        prevLatLng: {},
    });

    //Hiking Record
    const [startDatetime, setStartDatetime] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const LOCATION_TASK_NAME = 'BACKGROUND-LOCATION-TASK';
    let markerRef = useRef();
    let mapViewRef = useRef();

    const onFinishPressed = async () => {
        stopHiking();
        const tempMapViewRef = mapViewRef;
        const response = await showModal({
            message: '등산을 완료하겠습니까?',
            type: 'confirm',
            buttonTexts: ['취소', '완료'],
            async: true,
        });
        if (response) {
            startHiking();
            return;
        }

        const snapshot = tempMapViewRef.takeSnapshot({
            width: 300,
            height: 200,
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
                console.error('실패');
            });
    };

    const onTogglePressed = () => {
        if (isRecordRunning) {
            stopHiking();
        } else {
            startHiking();
        }
    };

    const onMoveMapToCurrentRegion = () => {
        mapViewRef.animateToRegion(getMapRegion());
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

    /**
     * state값으로 MapRegion 객체 만들어서 리턴
     */
    const getMapRegion = () => ({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    /**
     * 현재 위치로 state값 업데이트
     */
    const setCurrentPosition = async () => {
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
    };

    /**
     * 갱신된 위치로 state 값 업데이트
     * @param {*} newPosition
     */
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

    /**
     * Background 위치 업데이트 시작
     * @returns
     */
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
            accuracy: Location.Accuracy.High,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
                notificationTitle: 'Location',
                notificationBody: 'Location tracking in background',
                notificationColor: '#fff',
            },
        });
    };

    /**
     * Background 위치 업데이트 중단
     */
    const stopBackgroundPositionUpdate = async () => {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        );
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
            console.log('Location tacking stopped');
        }
    };

    /**
     * 위치 추적을 위한 백그라운드 태스크 정의
     */
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

        // setLoading(true);
        requestPermissions()
            .then(async (granted) => {
                if (granted) {
                    console.log('위치 권한 요청 허용');
                    setCurrentPosition()
                        .then((resp) => {
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
            >
                <Marker.Animated
                    ref={markerRef}
                    coordinate={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                    }}
                >
                    <Fontisto name="map-marker-alt" size={24} color="#FF0000" />
                </Marker.Animated>
                <Polyline
                    coordinates={position.routeCoords}
                    strokeWidth={5}
                    strokeColor="#FF0000"
                />
            </MapView>
            <View style={styles.myLocation}>
                <MaterialIcons
                    name="gps-fixed"
                    size={25}
                    color="black"
                    onPress={onMoveMapToCurrentRegion}
                />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.timerContainer}>
                    <Text style={styles.timeText}>
                        {hourTime}:{minuteTime}:{secondTime} (
                        {position.routeCoords.length})
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
                        bgColor={toggleButtonProps.color}
                        textColor="#757575"
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
        // flex: 1,
        width: '100%',
        height: '71%',
    },
    myLocation: {
        position: 'absolute',
        top: '62%',
        right: '5%',
        width: 45,
        height: 45,
        elevation: 2,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        height: '30%',
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
