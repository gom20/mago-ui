import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { signup } from '../../slices/authSlice';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const validateInputs = () => {
        let validFlag = true;

        setEmail((email) => email.trim());
        setName((name) => name.trim());
        setPassword((password) => password.trim());
        setConfirmPassword((confirmPassword) => confirmPassword.trim());

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

        dispatch(
            signup({
                email: email,
                name: name,
                password: password,
            })
        )
            .unwrap()
            .then((response) => {
                navigation.navigate('SignUpSuccess');
            })
            .catch((error) => {});
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}
        >
            <View>
                <Text style={styles.text}>????????????</Text>
                <CustomInput
                    label="?????????"
                    value={email}
                    setValue={setEmail}
                    placeholder="?????????"
                    invalidFlag={emailError}
                    invalidText="???????????? ????????? ?????????."
                    maxLength={50}
                />
                <CustomInput
                    label="??????"
                    value={name}
                    setValue={setName}
                    placeholder="??????"
                    invalidFlag={nameError}
                    invalidText="????????? ????????? ?????????."
                    maxLength={50}
                />
                <CustomInput
                    label="????????????"
                    value={password}
                    setValue={setPassword}
                    placeholder="?????????, ?????? ?????? 8~20???"
                    secureTextEntry={true}
                    invalidFlag={passwordError}
                    invalidText="?????????, ?????? ???????????? 8??? ?????? ??????????????????."
                    maxLength={20}
                />
                <CustomInput
                    label="???????????? ??????"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    placeholder="???????????? ??????"
                    secureTextEntry={true}
                    invalidFlag={confirmPasswordError}
                    invalidText="???????????? ??????????????? ????????????."
                    maxLength={20}
                />
                <View style={{ marginTop: '10%' }}></View>
                <CustomButton
                    style={styles.button}
                    onPress={onSignUpPressed}
                    text="????????????"
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29.3,
        marginBottom: '8%',
        alignSelf: 'center',
    },
});

export default SignUpScreen;
