import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import getEnvVars from '../environment';

const SignUpScreen = () => {
    const ENV = getEnvVars();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const navigation = useNavigation();

    const validateInputs = () => {
        let validFlag = true;

        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (email && emailRegex.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
            validFlag = false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        if (password && passwordRegex.test(password)) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
            validFlag = false;
        }
        if (name) {
            setNameError(false);
        } else {
            setNameError(true);
            validFlag = false;
        }
        if (confirmPassword && password === confirmPassword) {
            setConfirmPasswordError(false);
        } else {
            setConfirmPasswordError(true);
            validFlag = false;
        }

        return validFlag;
    };

    const onSignUpPressed = () => {
        if (!validateInputs()) return;

        axios({
            method: 'post',
            url: ENV.apiDomain + '/api/members',
            data: JSON.stringify({
                email: email,
                name: name,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(function (response) {
                console.error(response);
                if (response.data.code == 0) {
                    navigation.navigate('SignIn');
                } else {
                    alert('server error');
                }
            })
            .catch(function (error) {
                alert('internal error');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>회원가입</Text>
            <CustomInput
                label="이메일"
                value={email}
                setValue={setEmail}
                placeholder="이메일"
                invalidFlag={emailError}
                invalidText="이메일을 입력해 주세요."
            />
            <CustomInput
                label="이름"
                value={name}
                setValue={setName}
                placeholder="이름"
                invalidFlag={nameError}
                invalidText="이름을 입력해 주세요."
            />
            <CustomInput
                label="비밀번호"
                value={password}
                setValue={setPassword}
                placeholder="영문자, 숫자 포함 최소 8~20자"
                secureTextEntry={true}
                invalidFlag={passwordError}
                invalidText="영문자, 숫자 조합으로 8자 이상 입력해주세요."
            />
            <CustomInput
                label="비밀번호 확인"
                value={confirmPassword}
                setValue={setConfirmPassword}
                placeholder="비밀번호 확인"
                secureTextEntry={true}
                invalidFlag={confirmPasswordError}
                invalidText="입력하신 비밀번호와 다릅니다."
            />
            <View style={{ marginTop: '5%' }}></View>
            <CustomButton onPress={onSignUpPressed} text="회원가입" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '30%',
        marginLeft: '9%',
        marginRight: '9%',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29.3,
        marginBottom: '8%',
    },
    label: {
        marginTop: '1%',
        fontSize: 14,
        lineHeight: 29.3,
    },
    invalid: {
        fontSize: 11,
        color: 'blue',
    },
});

export default SignUpScreen;
