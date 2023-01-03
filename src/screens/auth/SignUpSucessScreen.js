import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { signup } from '../../slices/authSlice';

const SignUpSuccessScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onOnboardPressed = () => {
        navigation.navigate('Onboard');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                가입을 축하드려요!{'\n'}이제 나의 산을 기록하세요.
            </Text>
            <View style={styles.button}>
                <CustomButton
                    onPress={onOnboardPressed}
                    text="마운틴고 홈으로"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 25,
        marginTop: '50%',
    },
    button: {
        marginBottom: '20%',
    },
});

export default SignUpSuccessScreen;
