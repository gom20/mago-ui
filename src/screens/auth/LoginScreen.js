import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { login } from '../../slices/authSlice';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validateInputs = () => {
        email ? setEmailError(false) : setEmailError(true);
        password ? setPasswordError(false) : setPasswordError(true);
        return email && password ? true : false;
    };

    const onLoginPressed = async () => {
        if (!validateInputs()) return;
        dispatch(
            login({
                email: email,
                password: password,
            })
        )
            .unwrap()
            .then((response) => {
                navigation.navigate('Home');
            })
            .catch((error) => {});
    };

    const onForgetPasswordPressed = () => {
        navigation.navigate('SendTempPassword');
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}
        >
            <View>
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
                    <Pressable onPress={onForgetPasswordPressed}>
                        <Text style={styles.smallText}>
                            비밀번호를 잊으셨나요?
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton onPress={onLoginPressed} text="로그인" />
                </View>
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
    inputContainer: {
        marginTop: '20%',
        marginBottom: '20%',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29.3,
        marginBottom: '8%',
        alignSelf: 'center',
    },
    smallText: { fontSize: 13, color: '#949494', textAlign: 'right' },
});

export default LoginScreen;
