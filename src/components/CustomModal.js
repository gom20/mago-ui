import React, { useContext } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import { ModalContext } from '../utils/ModalContext';

const CustomModal = ({}) => {
    let { modalProps, hideModal } = useContext(ModalContext);
    const deviceHeight = Dimensions.get('screen').height;

    return (
        <Modal
            isVisible={modalProps.visible}
            style={styles.container}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropOpacity={0.5}
            animationInTiming={1}
            animationOutTiming={1}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            statusBarTranslucent
            deviceHeight={deviceHeight}
        >
            <View style={styles.modalContent}>
                {modalProps.image && (
                    <Image
                        source={modalProps.image}
                        style={{ marginTop: '10%' }}
                    ></Image>
                )}
                <Text style={styles.contentText}>{modalProps.message}</Text>
                <View style={styles.line}></View>
                {modalProps.type == 'alert' && (
                    <Pressable
                        onPress={() => hideModal(true)}
                        activeOpacity={0.8}
                        style={{ alignSelf: 'stretch' }}
                    >
                        <Text style={styles.buttonText}>
                            {modalProps.buttonTexts[0]}
                        </Text>
                    </Pressable>
                )}
                {modalProps.type == 'confirm' && (
                    <View style={styles.buttonContianer}>
                        <Pressable
                            onPress={() => hideModal(false)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                {modalProps.buttonTexts[0]}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => hideModal(true)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                {modalProps.buttonTexts[1]}
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 280,
        borderRadius: 10,
        borderColor: '#FFFFFF',
    },
    contentText: {
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        textAlign: 'center',
    },
    line: {
        alignSelf: 'stretch',
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1,
    },
    buttonContianer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        marginTop: 13,
        marginBottom: 13,
        color: '#0DD36E',
        textAlign: 'center',
    },
});

export default CustomModal;
