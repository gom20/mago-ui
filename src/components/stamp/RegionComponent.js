import { Image, Pressable, StyleSheet, Text } from 'react-native';
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
} from './SvgRegionComponent';

const RegionComponent = ({
    regionType,
    pressable,
    regionName,
    regionColor,
    setRegionColor,
    onRegionPressed,
    positionX,
    positionY,
    size,
}) => {
    const renderRegionSvg = (regionType) => {
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

    return (
        <>
            {renderRegionSvg(regionType)}
            {pressable && (
                <Pressable
                    onPress={() => {
                        onRegionPressed(regionType, regionName);
                    }}
                    onTouchStart={() => setRegionColor('#0DD36E')}
                    onTouchEnd={() => setRegionColor('#E1F7CB')}
                    style={[
                        {
                            position: 'absolute',
                            top: positionY,
                            left: positionX,
                        },
                        styles.regionPressableContainer,
                    ]}
                >
                    <Image
                        source={require('../../assets/images/mountain-icon.png')}
                    ></Image>
                    <Text>{regionName}</Text>
                </Pressable>
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

export default RegionComponent;
