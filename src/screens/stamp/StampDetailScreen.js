import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MountainComponent from '../../components/stamp/MountainComponent';
import RegionComponent from '../../components/stamp/RegionComponent';
import { selectStampsByRegionType } from '../../slices/stampSlice';

function StampDetailScreen({ route }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { regionType, regionName } = route.params;
    const StampsByRegion = useSelector((state) =>
        selectStampsByRegionType(state.stamp, regionType)
    );
    useEffect(() => {
        console.log(StampsByRegion);
        // console.log(mountains);
        // fetchData();
    }, []);

    return (
        <View style={styles.container}>
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
                        10
                    </Text>
                </View>
                <Text style={styles.totalCount}> / 100</Text>
            </View>
            <View style={styles.regionContainer}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        // backgroundColor: 'red',
                    }}
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
                            ></MountainComponent>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
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
    regionContainer: {
        marginTop: '5%',
        alignItems: 'center',
    },
});

export default StampDetailScreen;
