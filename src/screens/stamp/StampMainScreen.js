import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import RegionComponent from '../../components/stamp/RegionComponent';
import { getStamps } from '../../slices/stampSlice';

function StampMainScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [seoulGeonggiColor, setSeoulGeonggiColor] = useState('#E1F7CB');

    const [gangwonColor, setGangwonColor] = useState('#E1F7CB');
    const [chungbukColor, setChungbukColor] = useState('#E1F7CB');
    const [chungnamColor, setChungnamColor] = useState('#E1F7CB');
    const [gyeongbukColor, setGyeongbukColor] = useState('#E1F7CB');
    const [gyeongnamColor, setGyeongnamColor] = useState('#E1F7CB');
    const [jeonbukColor, setJeonbukColor] = useState('#E1F7CB');
    const [jeonnamColor, setJeonnamColor] = useState('#E1F7CB');
    const [jejuColor, setJejuColor] = useState('#E1F7CB');

    const onRegionPressed = (regionType, regionName) => {
        console.log(regionType);
        navigation.navigate('StampDetail', {
            regionType: regionType,
            regionName: regionName,
        });
    };

    const fetchData = () => {
        dispatch(getStamps())
            .unwrap()
            .then((response) => {})
            .catch((error) => {});
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>도전! 스탬프찍기!</Text>
            <Text style={styles.smallText}>
                100대 명산 얼마나 가봤나요?{'\n'}지금까지 가본 산에 스탬프를
                찍어보세요.
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

            <View style={styles.mapContainer}>
                <View style={{ position: 'absolute', top: 26.55, left: 59.02 }}>
                    <RegionComponent
                        regionType="SG"
                        regionName="서울/경기"
                        regionColor={seoulGeonggiColor}
                        setRegionColor={setSeoulGeonggiColor}
                        onRegionPressed={onRegionPressed}
                        positionY={52}
                        positionX={33}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 0, left: 124 }}>
                    <RegionComponent
                        regionType="GW"
                        regionName="강원도"
                        regionColor={gangwonColor}
                        setRegionColor={setGangwonColor}
                        onRegionPressed={onRegionPressed}
                        positionY={60}
                        positionX={60}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 136, left: 42.07 }}>
                    <RegionComponent
                        regionType="CN"
                        regionName="충청남도"
                        regionColor={chungnamColor}
                        setRegionColor={setChungnamColor}
                        onRegionPressed={onRegionPressed}
                        positionY={40}
                        positionX={30}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 124, left: 125 }}>
                    <RegionComponent
                        regionType="CB"
                        regionName="충청북도"
                        regionColor={chungbukColor}
                        setRegionColor={setChungbukColor}
                        onRegionPressed={onRegionPressed}
                        positionY={18}
                        positionX={10}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 109, left: 163 }}>
                    <RegionComponent
                        regionType="GB"
                        regionName="경상북도"
                        regionColor={gyeongbukColor}
                        setRegionColor={setGyeongbukColor}
                        onRegionPressed={onRegionPressed}
                        positionY={90}
                        positionX={40}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 244, left: 138 }}>
                    <RegionComponent
                        regionType="GN"
                        regionName="경상남도"
                        regionColor={gyeongnamColor}
                        setRegionColor={setGyeongnamColor}
                        onRegionPressed={onRegionPressed}
                        positionY={45}
                        positionX={40}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 221, left: 55 }}>
                    <RegionComponent
                        regionType="JB"
                        regionName="전라북도"
                        regionColor={jeonbukColor}
                        setRegionColor={setJeonbukColor}
                        onRegionPressed={onRegionPressed}
                        positionY={20}
                        positionX={30}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 277, left: 20 }}>
                    <RegionComponent
                        regionType="JN"
                        regionName="전라남도"
                        regionColor={jeonnamColor}
                        setRegionColor={setJeonnamColor}
                        onRegionPressed={onRegionPressed}
                        positionY={30}
                        positionX={50}
                        pressable={true}
                    />
                </View>
                <View style={{ position: 'absolute', top: 410, left: 53 }}>
                    <RegionComponent
                        regionType="JJ"
                        regionName="제주도"
                        regionColor={jejuColor}
                        setRegionColor={setJejuColor}
                        onRegionPressed={onRegionPressed}
                        positionY={0}
                        positionX={10}
                        pressable={true}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#FFFFFF',
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
