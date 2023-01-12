import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Confetti from 'react-native-confetti';
import { useDispatch, useSelector } from 'react-redux';
import RegionComponent from '../../components/stamp/RegionComponent';
import { getStamps, selectStampCount } from '../../slices/stampSlice';

function StampMainScreen() {
    const dispatch = useDispatch();
    const stamps = useSelector((state) => state.stamp.stamps);
    const flagCount = useSelector((state) => selectStampCount(state.stamp));

    const fetchData = () => {
        dispatch(getStamps())
            .unwrap()
            .then((response) => {})
            .catch((error) => {});
    };
    let confettiRef;
    const regionList = [
        {
            regionType: 'SG',
            regionName: '서울/경기',
            top: 26.55,
            left: 59.02,
            pressableTop: 52,
            pressableLeft: 33,
        },
        {
            regionType: 'GW',
            regionName: '강원도',
            top: 0,
            left: 124,
            pressableTop: 60,
            pressableLeft: 60,
        },
        {
            regionType: 'CN',
            regionName: '충청남도',
            top: 136,
            left: 42.07,
            pressableTop: 40,
            pressableLeft: 30,
        },
        {
            regionType: 'CB',
            regionName: '충청북도',
            top: 124,
            left: 125,
            pressableTop: 18,
            pressableLeft: 10,
        },
        {
            regionType: 'GB',
            regionName: '경상북도',
            top: 109,
            left: 163,
            pressableTop: 90,
            pressableLeft: 40,
        },
        {
            regionType: 'GN',
            regionName: '경상남도',
            top: 244,
            left: 138,
            pressableTop: 45,
            pressableLeft: 40,
        },
        {
            regionType: 'JB',
            regionName: '전라북도',
            top: 221,
            left: 55,
            pressableTop: 20,
            pressableLeft: 30,
        },
        {
            regionType: 'JN',
            regionName: '전라남도',
            top: 277,
            left: 20,
            pressableTop: 30,
            pressableLeft: 50,
        },
        {
            regionType: 'JJ',
            regionName: '제주도',
            top: 410,
            left: 53,
            pressableTop: 0,
            pressableLeft: 10,
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('[StampMainScreen] useEffect');
        if (flagCount == 100) {
            console.log('[StampMainScreen] startConfetti');
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
            <Text style={styles.text}>정상에 깃발꽂기!</Text>
            <Text style={styles.smallText}>
                100대 명산 얼마나 가봤나요?{'\n'}
                지금까지 가본 산에 깃발을 꽂아보세요.
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

            <View style={styles.mapContainer}>
                {regionList.map((region) => (
                    <View
                        key={region.regionType}
                        style={{
                            position: 'absolute',
                            top: region.top,
                            left: region.left,
                        }}
                    >
                        <RegionComponent
                            regionType={region.regionType}
                            regionName={region.regionName}
                            pressable={true}
                            pressableTop={region.pressableTop}
                            pressableLeft={region.pressableLeft}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
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
    mapContainer: {},
    regionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StampMainScreen;
