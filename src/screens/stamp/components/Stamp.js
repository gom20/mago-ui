import { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateStamp } from '../../../slices/stampSlice';
import { ModalContext } from '../../../utils/ModalContext';

const Stamp = ({
    mountainId,
    mountainName,
    positionX,
    positionY,
    flag,
    onPressed,
}) => {
    const dispatch = useDispatch();
    const { showModal } = useContext(ModalContext);

    const onStampPressed = async () => {
        console.log('[Stamp] onStampPressed');

        const confirmMessage = flag
            ? '에서 깃발을 회수하시겠습니까?'
            : '에 깃발을 꽂으시겠습니까?';
        const confirmButtonText = flag ? '네! 회수하기' : '네! 깃발꽂기';
        const response = await showModal({
            async: true,
            type: 'confirm',
            message: mountainName + confirmMessage,
            buttonTexts: ['아니오', confirmButtonText],
        });
        if (!response) return;

        dispatch(
            updateStamp({
                mountainId: mountainId,
                flag: !flag,
            })
        )
            .unwrap()
            .then((response) => {
                onPressed(!flag);
            })
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
                    source={require('../../../assets/images/flag.png')}
                    resizeMode="contain"
                ></Image>
            )}
            <Pressable
                onPress={() => {
                    onStampPressed();
                }}
                style={styles.pressableContainer}
            >
                <Image
                    source={require('../../../assets/images/mountain-icon.png')}
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

export default Stamp;
