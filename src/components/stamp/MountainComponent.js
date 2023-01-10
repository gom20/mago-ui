import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const MountainComponent = ({
    mountainId,
    mountainName,
    onMountainPressed,
    positionX,
    positionY,
}) => {
    console.log(mountainName, positionX, positionY);

    return (
        <Pressable
            onPress={() => {
                // onMountainPressed(mountainId);
            }}
            style={[
                {
                    position: 'absolute',
                    top: positionY,
                    left: positionX,
                },
                styles.mountainPressableContainer,
            ]}
        >
            <Image
                source={require('../../assets/images/mountain-icon.png')}
            ></Image>
            <Text>{mountainName}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    mountainPressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MountainComponent;
