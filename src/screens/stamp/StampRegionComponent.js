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
} from '../../components/SvgComponent';

const StampRegionComponent = ({
    regionId,
    regionName,
    regionColor,
    setRegionColor,
    positionX,
    positionY,
    onRegionPressed,
}) => {
    const renderRegionSvg = (regionId) => {
        switch (regionId) {
            case 'SG':
                return <SeoulGeonggiSvg color={regionColor} />;
            case 'GW':
                return <GangwonSvg color={regionColor} />;
            case 'CB':
                return <ChungbukSvg color={regionColor} />;
            case 'CN':
                return <ChungnamSvg color={regionColor} />;
            case 'GB':
                return <GyeongbukSvg color={regionColor} />;
            case 'GN':
                return <GyeongnamSvg color={regionColor} />;
            case 'JB':
                return <JeonbukSvg color={regionColor} />;
            case 'JN':
                return <JeonnamSvg color={regionColor} />;
            case 'JJ':
                return <JejuSvg color={regionColor} />;
        }
    };

    return (
        <>
            {renderRegionSvg(regionId)}
            <Pressable
                onPress={() => {
                    onRegionPressed(regionId);
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
        </>
    );
};

const styles = StyleSheet.create({
    regionPressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StampRegionComponent;
