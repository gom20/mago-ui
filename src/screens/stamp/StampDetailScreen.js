import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Confetti from 'react-native-confetti';
import { useSelector } from 'react-redux';
import {
    selectFlagCountByRegion,
    selectStampsByRegion,
} from '../../slices/stampSlice';
import { ModalContext } from '../../utils/ModalContext';
import Region from './components/Region';
import Stamp from './components/Stamp';

function StampDetailScreen({ route }) {
    const { regionType, regionName } = route.params;
    const { showModal } = useContext(ModalContext);

    const stamps = useSelector((state) =>
        selectStampsByRegion(state.stamp, regionType)
    );
    const flagCount = useSelector((state) =>
        selectFlagCountByRegion(state.stamp, regionType)
    );

    let confettiRef;

    const onPressed = (check) => {
        if (check && flagCount == stamps.length - 1) {
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
        console.log('[StampDetailScreen] useEffect flagCount updated');
        if (flagCount == stamps.length) {
            confettiRef.startConfetti();
        }
    }, [flagCount]);

    return (
        <View style={styles.container}>
            <Confetti
                ref={(ref) => (confettiRef = ref)}
                duration={6000}
                confettiCount={30}
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
                        {flagCount}
                    </Text>
                </View>
                <Text style={styles.totalCount}> / {stamps.length}</Text>
            </View>
            <View style={styles.regionContainer}>
                <View>
                    <Region
                        regionType={regionType}
                        pressable={false}
                        size={'LARGE'}
                    ></Region>
                    {stamps.map((stamp) => {
                        return (
                            <Stamp
                                key={stamp.mountainId}
                                mountainId={stamp.mountainId}
                                mountainName={stamp.mountainName}
                                positionX={Number(stamp.positionX)}
                                positionY={Number(stamp.positionY)}
                                flag={stamp.flag}
                                onPressed={onPressed}
                            ></Stamp>
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
