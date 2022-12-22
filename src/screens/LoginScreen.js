import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { login } from '../slices/authSlice';
import { clearMessage } from '../slices/messageSlice';

const LoginScreen = () => {
    const navigation = useNavigation();

    const { isLoggedIn, user } = useSelector((state) => ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    }));
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const onLoginPressed = async () => {
        const _validateInputs = () => {
            email ? setEmailError(false) : setEmailError(true);
            password ? setPasswordError(false) : setPasswordError(true);
            return email && password ? true : false;
        };

        if (!_validateInputs()) return;
        const req = JSON.stringify({
            email: email,
            password: password,
        });

        setLoading(true);
        dispatch(login(req))
            .unwrap()
            .then((res) => {
                setLoading(false);
                navigation.navigate('AppTabComponent');
            })
            .catch(() => {
                setLoading(false);
            });
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
            <View style={styles.inputContainer}>
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
                <CustomButton onPress={onLoginPressed} text="로그인" />

                <View style={styles.line} />

                <Pressable onPress={onSocialLoginPressed}>
                    <Image
                        style={styles.image}
                        source={require('./../assets/images/kakao_login_medium_wide.png')}
                    />
                </Pressable>

                <View style={styles.otherButtonContainer}>
                    <Pressable onPress={onForgotPasswordPressed}>
                        <Text style={styles.otherButtonText}>
                            비밀번호 찾기{' '}
                        </Text>
                    </Pressable>
                    <Text style={styles.otherButtonText}>|</Text>
                    <Pressable onPress={onSignUpPressed}>
                        <Text style={styles.otherButtonText}>
                            {' '}
                            회원가입 하기
                        </Text>
                    </Pressable>
                </View>
            </View>
            {loading && <CustomActivityIndicator />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        marginTop: '40%',
        marginLeft: '9%',
        marginRight: '9%',
    },
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
    loading: {},
});

export default LoginScreen;
