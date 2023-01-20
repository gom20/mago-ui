import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MountainComponent from './components/Stamp';
import RegionComponent from './components/Region';
import {
    selectFlagCountByRegionType,
    selectStampsByRegionType,
} from '../../slices/stampSlice';
import Confetti from 'react-native-confetti';
import { ModalContext } from '../../utils/ModalContext';

function StampDetailScreen({ route }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { regionType, regionName } = route.params;
    const { showModal } = useContext(ModalContext);
    const StampsByRegion = useSelector((state) =>
        selectStampsByRegionType(state.stamp, regionType)
    );
    const StampsByRegionCount = useSelector((state) =>
        selectFlagCountByRegionType(state.stamp, regionType)
    );
    let confettiRef;

    const onPressed = (check) => {
        if (check && StampsByRegionCount == StampsByRegion.length - 1) {
            const message =
                '대단해요!\n' +
                regionName +
                ' 산을 모두 완료하셨습니다!\n다른 도에도 명산들이 많아요!\n지금 바로 도전해 보세요!';
            showModal({
                message: message,
                image: require('../../assets/images/completed.png'),
            });
        }
    };
    useEffect(() => {
        if (StampsByRegionCount == StampsByRegion.length) {
            confettiRef.startConfetti();
        }

        console.log('useEffect');
    }, []);

    return (
        <View style={styles.container}>
            <Confetti
                ref={(ref) => (confettiRef = ref)}
                duration={6000}
                confettiCount={30}
                // timeout={}
            />
            <Text style={styles.text}>{regionName}</Text>
            <Text style={styles.smallText}>
                {regionName}의 명산{'\n'}기본 산에 스탬프를 꾹!
            </Text>
            <View style={styles.countContainer}>
                <View style={styles.stampCount}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: '#FFFFFF',
                            fontWeight: '600',
                        }}
                    >
                        {StampsByRegionCount}
                    </Text>
                </View>
                <Text style={styles.totalCount}>
                    {' '}
                    / {StampsByRegion.length}
                </Text>
            </View>
            <View style={styles.regionContainer}>
                <View
                    style={
                        {
                            // position: 'absolute',
                            // top: 0,
                            // left: 0,
                            // backgroundColor: 'red',
                        }
                    }
                >
                    <RegionComponent
                        regionType={regionType}
                        pressable={false}
                        size={'LARGE'}
                    ></RegionComponent>
                    {StampsByRegion.map((stamp) => {
                        return (
                            <MountainComponent
                                key={stamp.mountainId}
                                mountainId={stamp.mountainId}
                                mountainName={stamp.mountainName}
                                positionX={Number(stamp.positionX)}
                                positionY={Number(stamp.positionY)}
                                flag={stamp.flag}
                                onPressed={onPressed}
                            ></MountainComponent>
                        );
                    })}
                </View>
            </View>
            <Text style={styles.footerText}>출처 : 산림청 선정 100대 명산</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '600',
    },
    smallText: {
        textAlign: 'center',
        color: '#949494',
        marginVertical: '2%',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stampCount: {
        width: 50,
        height: 50,
        backgroundColor: '#0DD36E',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalCount: {
        color: '#949494',
        fontSize: 18,
    },
    regionContainer: {
        // marginTop: '5%',
        alignItems: 'center',
        marginBottom: 20,
    },
    footerText: {
        color: '#949494',
        fontSize: 8,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
});

export default StampDetailScreen;
