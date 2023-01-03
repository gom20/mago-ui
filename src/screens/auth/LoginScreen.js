import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { login } from '../../slices/authSlice';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onLoginPressed = async () => {
        const _validateInputs = () => {
            email ? setEmailError(false) : setEmailError(true);
            password ? setPasswordError(false) : setPasswordError(true);
            return email && password ? true : false;
        };

        if (!_validateInputs()) return;
        dispatch(
            login({
                email: email,
                password: password,
            })
        )
            .unwrap()
            .then((response) => {
                console.error(response);
                navigation.navigate('MainTab');
            })
            .catch((error) => {});
    };

    const onPasswordResetPressed = () => {
        navigation.navigate('PasswordReset');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>이메일로 로그인</Text>
            <View style={styles.inputContainer}>
                <CustomInput
                    value={email}
                    setValue={setEmail}
                    placeholder="이메일"
                    invalidFlag={emailError}
                    invalidText="이메일을 입력해 주세요."
                    maxLength={50}
                    label="이메일"
                />
                <CustomInput
                    value={password}
                    setValue={setPassword}
                    placeholder="비밀번호"
                    invalidFlag={passwordError}
                    invalidText="비밀번호를 입력해 주세요."
                    secureTextEntry
                    maxLength={50}
                    label="비밀번호"
                />
                <Pressable onPress={onPasswordResetPressed}>
                    <Text style={styles.smallText}>비밀번호를 잊으셨나요?</Text>
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton onPress={onLoginPressed} text="로그인" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    inputContainer: {
        marginTop: '20%',
        marginBottom: '30%',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29.3,
        marginBottom: '8%',
        alignSelf: 'center',
    },
    smallText: { fontSize: 13, color: '#949494', textAlign: 'right' },
    buttonContainer: {
        marginBottom: '20%',
    },
});

export default LoginScreen;
