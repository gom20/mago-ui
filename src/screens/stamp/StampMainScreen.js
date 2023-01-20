import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Confetti from 'react-native-confetti';
import { useDispatch, useSelector } from 'react-redux';
import regions from '../../regions.json';
import { getStamps, selectFlagCount } from '../../slices/stampSlice';
import Region from './components/Region';

function StampMainScreen() {
    const dispatch = useDispatch();
    const stamps = useSelector((state) => state.stamp.stamps);
    const flagCount = useSelector((state) => selectFlagCount(state.stamp));
    let confettiRef;

    useEffect(() => {
        console.log('[StampMainScreen] useEffect');
        dispatch(getStamps());
    }, []);

    useEffect(() => {
        console.log('[StampMainScreen] useEffect flagCount updated');
        if (flagCount == 100) {
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
                {regions.data.map((region) => (
                    <View
                        key={region.regionType}
                        style={{
                            position: 'absolute',
                            top: region.top,
                            left: region.left,
                        }}
                    >
                        <Region
                            regionType={region.regionType}
                            regionName={region.regionName}
                            pressableTop={region.pressableTop}
                            pressableLeft={region.pressableLeft}
                            pressable={true}
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
