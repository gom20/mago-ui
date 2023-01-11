import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateStamp } from '../../slices/stampSlice';

const MountainComponent = ({
    mountainId,
    mountainName,
    positionX,
    positionY,
    flag,
}) => {
    const dispatch = useDispatch();
    const onMountainPressed = () => {
        console.log('pressed');
        dispatch(
            updateStamp({
                mountainId: mountainId,
                flag: !flag,
            })
        )
            .unwrap()
            .then((response) => {})
            .catch((error) => {});
    };

    return (
        <View
            style={[
                {
                    position: 'absolute',
                    top: positionY,
                    left: positionX,
                },
                styles.container,
            ]}
        >
            {flag && (
                <Image
                    style={styles.flag}
                    source={require('../../assets/images/flag.png')}
                    resizeMode="contain"
                ></Image>
            )}
            <Pressable
                onPress={onMountainPressed}
                style={styles.pressableContainer}
            >
                <Image
                    source={require('../../assets/images/mountain-icon.png')}
                ></Image>
                <Text
                    style={[
                        styles.text,
                        { color: flag ? '#000000' : '#949494' },
                    ]}
                >
                    {mountainName}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        position: 'absolute',
        top: -13,
        left: '43%',
        width: 15,
        height: 15,
    },
    pressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
    },
});

export default MountainComponent;
