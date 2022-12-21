import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../environment';

const SignInScreen = () => {
    const ENV = getEnvVars();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validateInputs = () => {
        if (email && password) return true;
        email ? setEmailError(false) : setEmailError(true);
        password ? setPasswordError(false) : setPasswordError(true);
        return false;
    };
    const onSignInPressed = () => {
        if (!validateInputs()) return;

        const submitData = {
            email: email ? email : 'rhaldud89@test.com',
            password: password ? password : 'test',
        };
        axios({
            method: 'post',
            url: ENV.apiDomain + '/api/members/login',
            data: JSON.stringify(submitData),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(function (response) {
                if (response.data.code == 0) {
                    AsyncStorage.setItem(
                        'userData',
                        JSON.stringify({
                            username: 'rhaldud89@gmail.com',
                            token: response.data.data.token,
                        }),
                        () => {
                            navigation.navigate('AppTabComponent');
                        }
                    );
                }
            })
            .catch(function (error) {});
    };

    const onSignUpPressed = async (data) => {
        navigation.navigate('SignUp');
    };

    const onSocialLoginPressed = () => {
        alert('onSocialLoginPressed');
    };

    const onForgotPasswordPressed = () => {
        alert('onForgotPasswordPressed');
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
            />
            <CustomInput
                value={password}
                setValue={setPassword}
                placeholder="비밀번호"
                invalidFlag={passwordError}
                invalidText="비밀번호를 입력해 주세요."
                secureTextEntry
            />
            <CustomButton onPress={onSignInPressed} text="로그인" />

            <View style={styles.line} />

            <Pressable onPress={onSocialLoginPressed}>
                <Image
                    style={styles.image}
                    source={require('./../assets/images/kakao_login_medium_wide.png')}
                />
            </Pressable>

            <View style={styles.otherButtonContainer}>
                <Pressable onPress={onForgotPasswordPressed}>
                    <Text style={styles.otherButtonText}>비밀번호 찾기 </Text>
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
    text: {
        fontSize: 25,
        fontWeight: '500',
        // color: '#FFFFFF',
        lineHeight: 29.3,
    },
    smallText: {
        fontSize: 12,
        fontWeight: '300',
        // color: '#FFFFFF',
        marginTop: 5,
        marginBottom: 50,
        // color: '#EEEEEE',
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
        // color: '#EEEEEE',
    },
});

export default SignInScreen;
