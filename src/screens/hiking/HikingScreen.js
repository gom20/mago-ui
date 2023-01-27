import {
    Entypo,
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import CustomButton from '../../components/CustomButton';
import {
    endBreak,
    resetHiking,
    setCurPosition,
    setStartPosition,
    startBreak,
    decrementDelta,
    incrementDelta,
} from '../../slices/hikingSlice';
import { hideLoading, showLoading } from '../../slices/loadingSlice';
import { createRecord } from '../../slices/recordSlice';
import { ModalContext } from '../../utils/ModalContext';

export default HikingScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { showModal } = useContext(ModalContext);

    const { seconds, minutes, hours, start, pause } = useStopwatch({
        autoStart: false,
        offsetTimestamp: new Date(),
    });
    const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const pauseBtnProps = {
        text: '일시정지',
        iconType: 'pause',
        bgColor: '#F5F5F5',
        color: '#000000',
    };
    const resumeBtnProps = {
        text: '계속하기',
        iconType: 'play-arrow',
        bgColor: '#000000',
        color: '#FFFFFF',
    };

    const curPosition = useSelector((state) => state.hiking.curPosition);
    const startPosition = useSelector((state) => state.hiking.startPosition);
    const breakTime = useSelector((state) => state.hiking.breakInfo.totalTime);
    const deltaInfo = useSelector((state) => state.hiking.deltaInfo);
    const user = useSelector((state) => state.auth.user);

    const [isGpsFixed, setGpsFixed] = useState(true);
    const [isHiking, setHiking] = useState(true);
    const [toggleProps, setToggleProps] = useState(pauseBtnProps);
    const [startDatetime, setStartDatetime] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const BACKGROUND_LOCATION_TASK = 'BACKGROUND-LOCATION-TASK';
    let curMarkerRef = useRef();
    let mapViewRef = useRef();

    const onZoomOutPressed = () => {
        if (deltaInfo.upLimit) return;
        mapViewRef.animateToRegion({
            latitude: curPosition.latitude,
            longitude: curPosition.longitude,
            latitudeDelta: curPosition.latitudeDelta * 5,
            longitudeDelta: curPosition.longitudeDelta * 5,
        });
        dispatch(incrementDelta());
    };

    const onZoomInPressed = () => {
        if (deltaInfo.downLimit) return;
        mapViewRef.animateToRegion({
            latitude: curPosition.latitude,
            longitude: curPosition.longitude,
            latitudeDelta: curPosition.latitudeDelta / 5,
            longitudeDelta: curPosition.longitudeDelta / 5,
        });
        dispatch(decrementDelta());
    };

    const onTogglePressed = () => {
        if (isHiking) {
            stopHiking();
        } else {
            resumeHiking();
        }
    };

    const onGpsButtonPressed = () => {
        mapViewRef.animateToRegion(getMapRegion());
        setGpsFixed(true);
    };

    const onFinishPressed = async () => {
        const tempMapViewRef = mapViewRef;
        moveRegionForSnapshot();
        const response = await showModal({
            message: '등산을 완료하겠습니까?',
            type: 'confirm',
            buttonTexts: ['취소', '완료'],
            async: true,
        });
        if (!response) {
            return;
        }

        stopHiking();
        takeSnapshotThenSaveRecord(tempMapViewRef);
    };

    const takeSnapshotThenSaveRecord = (ref) => {
        const snapshot = ref.takeSnapshot({
            format: 'png',
            quality: 0.5,
            result: 'file',
        });
        snapshot
            .then((snapshotUri) => {
                saveRecord(snapshotUri);
            })
            .catch((error) => {
                console.log(error);
                showModal({
                    message: '저장에 실패하였습니다.',
                });
            });
    };

    const saveRecord = (snapshotUri) => {
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
                distance: curPosition.distance,
                minAltitude: curPosition.minAltitude,
                maxAltitude: curPosition.maxAltitude,
                breakTime: breakTime,
                imgPath: snapshotUri,
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
    };

    const moveRegionForSnapshot = () => {
        let coords = curPosition.routeCoords;
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
            latitudeDelta: curPosition.latitudeDelta,
            longitudeDelta: curPosition.longitudeDelta,
        });
    };

    const initHiking = () => {
        setStartDatetime(new Date());
        startHiking();
    };

    const resumeHiking = () => {
        dispatch(endBreak(new Date().getSeconds()));
        startHiking();
    };

    const startHiking = () => {
        start();
        startBackgroundPositionUpdate();
        setToggleProps(pauseBtnProps);
        setHiking(true);
    };

    const stopHiking = () => {
        pause();
        dispatch(startBreak(new Date().getSeconds()));
        stopBackgroundPositionUpdate();
        setToggleProps(resumeBtnProps);
        setHiking(false);
    };

    const getMapRegion = () => ({
        latitude: curPosition.latitude,
        longitude: curPosition.longitude,
        latitudeDelta: curPosition.latitudeDelta,
        longitudeDelta: curPosition.longitudeDelta,
    });

    const setCurrentPosition = async (response) => {
        dispatch(setCurPosition(response.coords));
        dispatch(setStartPosition(response.coords));
    };

    const setUpdatedPosition = (newPosition) => {
        const { latitude, longitude, altitude } = newPosition.coords;
        if (curMarkerRef && curMarkerRef.current) {
            curMarkerRef.current.animateMarkerToCoordinate(
                { latitude, longitude },
                500
            );
        }
        dispatch(
            setCurPosition({
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
            })
        );
    };

    const startBackgroundPositionUpdate = async () => {
        const isTaskDefined = await TaskManager.isTaskDefined(
            BACKGROUND_LOCATION_TASK
        );
        if (!isTaskDefined) {
            console.log('[HikingScreen] Task is not defined');
            return;
        }
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            BACKGROUND_LOCATION_TASK
        );
        if (hasStarted) {
            console.log('[HikingScreen] Already started. stop then start');
            await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
            console.log('[HikingScreen] Location tacking stopped');
        }

        await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
            accuracy: Location.Accuracy.BestForNavigation,
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
            BACKGROUND_LOCATION_TASK
        );
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
            console.log('[HikingScreen] Location tacking stopped');
        }
    };

    TaskManager.defineTask(
        BACKGROUND_LOCATION_TASK,
        async ({ data, error }) => {
            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                const { locations } = data;
                const location = locations[0];
                if (location) {
                    setUpdatedPosition(location);
                    // console.log(
                    //     '[HikingScreen] Location in background',
                    //     location.coords
                    // );
                }
            }
        }
    );

    const loadCurrentPosition = async (mapViewRef) => {
        console.log('[HikingScreen] 현재 위치 요청');
        try {
            const response = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            console.log('[HikingScreen] 현재 위치 로드 완료');
            dispatch(hideLoading());
            setCurrentPosition(response);
            mapViewRef.animateToRegion({
                latitude: response.coords.latitude,
                longitude: response.coords.longitude,
                latitudeDelta: curPosition.latitudeDelta,
                longitudeDelta: curPosition.longitudeDelta,
            });
            initHiking();
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            await showModal({
                async: true,
                message: '위치 정보를 가져올 수 없습니다.',
            });
            navigation.navigate('MainTab');
        }
    };

    const confirmBackAction = async () => {
        const response = await showModal({
            async: true,
            message: '등산을 취소하시겠습니까?',
            type: 'confirm',
            buttonTexts: ['아니오', '네'],
        });
        if (!response) return;
        dispatch(hideLoading());
        navigation.navigate('MainTab');
    };

    useFocusEffect(
        useCallback(() => {
            const onBackPress = async () => {
                confirmBackAction();
            };
            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
            return () => subscription.remove();
        }, [])
    );

    useLayoutEffect(() => {
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
        console.log('[HikingScreen] 위치 권한 요청');
        requestPermissions()
            .then(async (granted) => {
                if (granted) {
                    console.log('[HikingScreen] 위치 권한 요청 허용 완료');
                    setPermissionGranted(true);
                    dispatch(showLoading());
                } else {
                    console.log('[HikingScreen] 위치 권한 요청 거부');
                    await showModal({
                        message:
                            '[HikingScreen] 위치 엑세스 권한을 허용하셔야 해당 기능을 사용할 수 있습니다',
                        async: true,
                    });
                    navigation.navigate('MainTab');
                }
            })
            .catch(async (error) => {
                console.log('[HikingScreen] 위치 권한 요청 에러');
                await showModal({
                    message:
                        '[HikingScreen] 위치 엑세스 권한 정보를 받지 못하였습니다.',
                    async: true,
                });
                navigation.navigate('MainTab');
            });

        return () => {
            console.log('[HikingScreen] Component Unmount');
            setPermissionGranted(false);
            dispatch(hideLoading());
            dispatch(resetHiking());
            stopBackgroundPositionUpdate();
        };
    }, []);

    return (
        <View style={styles.container}>
            {permissionGranted && (
                <MapView
                    ref={(mapView) => {
                        mapViewRef = mapView;
                    }}
                    showUserLocation
                    // loadingEnabled
                    initialRegion={getMapRegion()}
                    style={styles.mapContainer}
                    onPanDrag={() => {
                        if (isGpsFixed) {
                            setGpsFixed(false);
                        }
                    }}
                    onMapLoaded={() => {
                        console.log('[HikingScreen] 맵뷰 로드 완료');
                        loadCurrentPosition(mapViewRef);
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: startPosition.latitude,
                            longitude: startPosition.longitude,
                        }}
                        title="시작지점"
                    >
                        <Image
                            source={require('../../assets/images/start-pin.png')}
                            style={{ width: 32, height: 32 }}
                            resizeMode="contain"
                        />
                    </Marker>

                    <Marker.Animated
                        ref={curMarkerRef}
                        coordinate={{
                            latitude: curPosition.latitude,
                            longitude: curPosition.longitude,
                        }}
                        title="현재위치"
                    >
                        <Image
                            source={require('../../assets/images/hiking-pin.png')}
                            style={{ width: 32, height: 32 }}
                            resizeMode="contain"
                        />
                    </Marker.Animated>

                    <Polyline
                        coordinates={curPosition.routeCoords}
                        strokeWidth={5}
                        strokeColor="#FF0000"
                    />
                </MapView>
            )}
            <View style={styles.zoomButton}>
                <Entypo
                    name="plus"
                    size={24}
                    color={deltaInfo.downLimit ? '#EEEEEE' : '#000'}
                    onPress={onZoomInPressed}
                />
                <Entypo
                    name="minus"
                    size={24}
                    color={deltaInfo.upLimit ? '#EEEEEE' : '#000'}
                    onPress={onZoomOutPressed}
                />
            </View>

            <View style={styles.gpsButton}>
                <MaterialIcons
                    name={isGpsFixed ? 'gps-fixed' : 'gps-not-fixed'}
                    size={23}
                    color={isGpsFixed ? '#0DD36E' : '#cef2e0'}
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
                            {curPosition.distance.toFixed(3)} km
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
                            {curPosition.altitude.toFixed(2)} m
                        </Text>
                    </View>
                    <View style={styles.info}></View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={onTogglePressed}
                        text={toggleProps.text}
                        iconType={toggleProps.iconType}
                        bgColor={toggleProps.bgColor}
                        textColor={toggleProps.color}
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
    zoomButton: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        top: '45%',
        right: '5%',
        width: 45,
        height: 90,
        elevation: 4,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
    gpsButton: {
        position: 'absolute',
        top: '58%',
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
