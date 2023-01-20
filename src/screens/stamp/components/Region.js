import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectStampsByRegion } from '../../../slices/stampSlice';
import {
    ChungbukSvg,
    ChungnamSvg,
    GangwonSvg,
    GyeongbukSvg,
    GyeongnamSvg,
    JejuSvg,
    JeonbukSvg,
    JeonnamSvg,
    SeoulGeonggiSvg,
} from './SvgRegion';

const Region = ({
    regionType,
    pressable,
    regionName,
    pressableLeft,
    pressableTop,
    size,
}) => {
    const [regionColor, setRegionColor] = useState('#E1F7CB');
    const navigation = useNavigation();
    const stamps = useSelector((state) =>
        selectStampsByRegion(state.stamp, regionType)
    );
    const flag =
        stamps.length > 0
            ? stamps.find((stamp) => stamp.flag == false)
                ? false
                : true
            : false;

    const onRegionPressed = (regionType, regionName) => {
        navigation.navigate('StampDetail', {
            regionType: regionType,
            regionName: regionName,
        });
    };

    const renderRegionSvg = () => {
        switch (regionType) {
            case 'SG':
                return <SeoulGeonggiSvg color={regionColor} size={size} />;
            case 'GW':
                return <GangwonSvg color={regionColor} size={size} />;
            case 'CB':
                return <ChungbukSvg color={regionColor} size={size} />;
            case 'CN':
                return <ChungnamSvg color={regionColor} size={size} />;
            case 'GB':
                return <GyeongbukSvg color={regionColor} size={size} />;
            case 'GN':
                return <GyeongnamSvg color={regionColor} size={size} />;
            case 'JB':
                return <JeonbukSvg color={regionColor} size={size} />;
            case 'JN':
                return <JeonnamSvg color={regionColor} size={size} />;
            case 'JJ':
                return <JejuSvg color={regionColor} size={size} />;
        }
    };

    const renderFlag = () => {
        if (flag) {
            return (
                <Image
                    style={[
                        styles.flag,
                        {
                            width: 15,
                            height: 15,
                            position: 'absolute',
                            top: -15,
                            left: '45%',
                        },
                    ]}
                    source={require('../../../assets/images/flag.png')}
                    resizeMode="contain"
                ></Image>
            );
        }
    };

    return (
        <>
            {renderRegionSvg()}
            {pressable && (
                <View
                    style={[
                        {
                            position: 'absolute',
                            top: pressableTop,
                            left: pressableLeft,
                        },
                        styles.regionPressableContainer,
                    ]}
                >
                    {renderFlag()}
                    <Pressable
                        onPress={() => {
                            onRegionPressed(regionType, regionName);
                        }}
                        onTouchStart={() => setRegionColor('#0DD36E')}
                        onTouchEnd={() => setRegionColor('#E1F7CB')}
                        style={styles.regionPressableContainer}
                    >
                        <Image
                            source={require('../../../assets/images/mountain-icon.png')}
                        ></Image>
                        <Text>{regionName}</Text>
                    </Pressable>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    regionPressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Region;
