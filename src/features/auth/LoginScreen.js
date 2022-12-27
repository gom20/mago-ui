import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { login } from './authSlice';

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
                navigation.navigate('AppTabComponent');
            })
            .catch((error) => {});
    };

    const onSignUpPressed = async (data) => {
        navigation.navigate('SignUp');
    };

    const onSocialLoginPressed = () => {
        alert('onSocialLoginPressed');
    };

    const onPwResetPressed = () => {
        navigation.navigate('PwReset');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>안녕하세요,</Text>
            <Text style={styles.text}>MAGO 입니다.</Text>
            <Text style={styles.smallText}>
                서비스 이용을 위해 로그인 해주세요.
            </Text>

            <CustomInput
                value={email}
                setValue={setEmail}
                placeholder="이메일"
                invalidFlag={emailError}
                invalidText="이메일을 입력해 주세요."
                maxLength={50}
            />
            <CustomInput
                value={password}
                setValue={setPassword}
                placeholder="비밀번호"
                invalidFlag={passwordError}
                invalidText="비밀번호를 입력해 주세요."
                secureTextEntry
                maxLength={50}
            />
            <CustomButton onPress={onLoginPressed} text="로그인" />

            <View style={styles.line} />

            <Pressable onPress={onSocialLoginPressed}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/kakao_login_medium_wide.png')}
                />
            </Pressable>

            <View style={styles.otherButtonContainer}>
                <Pressable onPress={onPwResetPressed}>
                    <Text style={styles.otherButtonText}>비밀번호 재설정 </Text>
                </Pressable>
                <Text style={styles.otherButtonText}>|</Text>
                <Pressable onPress={onSignUpPressed}>
                    <Text style={styles.otherButtonText}> 회원가입 하기</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '40%',
        marginLeft: '9%',
        marginRight: '9%',
    },
    inputContainer: {},
    text: {
        fontSize: 25,
        fontWeight: '500',

        lineHeight: 29.3,
    },
    smallText: {
        fontSize: 12,
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 50,
    },
    line: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: '5%',
        marginBottom: '5%',
    },
    image: {
        width: '100%',
    },
    otherButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    otherButtonText: {
        fontWeight: '500',
        fontSize: 12,
    },
});

export default LoginScreen;
