import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../features/auth/messageSlice';

const CustomModal = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message.message);
    const closeModal = () => {
        dispatch(clearMessage());
    };
    return (
        <Modal isVisible={message ? true : false} style={styles.container}>
            <View style={styles.modalContent}>
                <Text style={styles.contentText}>{message}</Text>
                <View style={styles.line}></View>
                <TouchableOpacity
                    onPress={closeModal}
                    activeOpacity={0.8}
                    style={{ alignSelf: 'stretch' }}
                >
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
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
    buttonText: {
        marginTop: 13,
        marginBottom: 13,
        color: '#0DD36E',
        textAlign: 'center',
    },
});

export default CustomModal;
