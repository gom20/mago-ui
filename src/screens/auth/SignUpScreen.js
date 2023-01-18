import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { signup } from '../../slices/authSlice';

const SignUpScreen = ({ route }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, SetPasswordConfirmError] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const validateInputs = () => {
        let validFlag = true;

        setName((name) => name.trim());
        setPassword((password) => password.trim());
        setPasswordConfirm((passwordConfirm) => passwordConfirm.trim());

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
        if (passwordConfirm && password === passwordConfirm) {
            SetPasswordConfirmError(false);
        } else {
            SetPasswordConfirmError(true);
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
                passwordConfirm: passwordConfirm,
            })
        )
            .unwrap()
            .then((response) => {
                navigation.navigate('SignUpSuccess');
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
        }
    }, [route.params?.email]);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}
        >
            <View>
                <Text style={styles.text}>회원가입</Text>
                <CustomInput
                    label="이메일"
                    value={email}
                    setValue={setEmail}
                    placeholder="이메일"
                    editable={false}
                    maxLength={50}
                />
                <CustomInput
                    label="이름"
                    value={name}
                    setValue={setName}
                    placeholder="이름"
                    invalidFlag={nameError}
                    invalidText="이름을 입력해 주세요."
                    maxLength={50}
                />
                <CustomInput
                    label="비밀번호"
                    value={password}
                    setValue={setPassword}
                    placeholder="영문자, 숫자 조합 8~20자"
                    secureTextEntry={true}
                    invalidFlag={passwordError}
                    invalidText="영문자, 숫자 조합으로 8자 이상 입력해주세요."
                    maxLength={20}
                />
                <CustomInput
                    label="비밀번호 확인"
                    value={passwordConfirm}
                    setValue={setPasswordConfirm}
                    placeholder="비밀번호 확인"
                    secureTextEntry={true}
                    invalidFlag={passwordConfirmError}
                    invalidText="입력하신 비밀번호와 다릅니다."
                    maxLength={20}
                />
                <View style={{ marginTop: '10%' }}></View>
                <CustomButton
                    style={styles.button}
                    onPress={onSignUpPressed}
                    text="회원가입"
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
