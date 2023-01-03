import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { ModalContext } from '../utils/ModalContext';

const CustomModal = ({}) => {
    let { modalProps, showModal, hideModal } = useContext(ModalContext);

    return (
        <Modal isVisible={modalProps.visible} style={styles.container}>
            <View style={styles.modalContent}>
                <Text style={styles.contentText}>{modalProps.message}</Text>
                <View style={styles.line}></View>
                {modalProps.type == 'alert' && (
                    <TouchableOpacity
                        onPress={() => hideModal(true)}
                        activeOpacity={0.8}
                        style={{ alignSelf: 'stretch' }}
                    >
                        <Text style={styles.buttonText}>
                            {modalProps.buttonTexts[0]}
                        </Text>
                    </TouchableOpacity>
                )}
                {modalProps.type == 'confirm' && (
                    <View style={styles.buttonContianer}>
                        <TouchableOpacity
                            onPress={() => hideModal(true)}
                            activeOpacity={0.8}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                {modalProps.buttonTexts[0]}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => hideModal(false)}
                            activeOpacity={0.8}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                {modalProps.buttonTexts[1]}
                            </Text>
                        </TouchableOpacity>
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
        backgroundColor: 'white',
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
