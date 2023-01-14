import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { isEmailAthenticated, sendAuthEmail } from '../../slices/authSlice';
import { ModalContext } from '../../utils/ModalContext';

const AuthEmailScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [authButtonDisabled, setAuthButtonDisabled] = useState(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
    const { showModal } = useContext(ModalContext);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const validateInputs = () => {
        let validFlag = true;
        setEmail((email) => email.trim());
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (email && emailRegex.test(email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
            validFlag = false;
        }

        return validFlag;
    };

    const onAuthEmailPressed = () => {
        if (!validateInputs()) return;

        dispatch(
            sendAuthEmail({
                email: email,
            })
        )
            .unwrap()
            .then((response) => {
                showModal({
                    message:
                        '인증 메일이 ' +
                        email +
                        '(으)로 전송되었습니다. 이메일을 열어 인증을 완료하세요. ',
                });
                setAuthButtonDisabled(true);
                setNextButtonDisabled(false);
            })
            .catch((error) => {});
    };

    const onIsEmailAuthenticated = () => {
        dispatch(
            isEmailAthenticated({
                email: email,
            })
        )
            .unwrap()
            .then((response) => {
                if (response.data == true) {
                    navigation.navigate('SignUp', { email: email });
                } else {
                    showModal({
                        message: '인증이 완료되지 않았습니다.',
                    });
                }
            })
            .catch((error) => {});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                회원가입을 위해서는{'\n'}본인인증이 필요해요.
            </Text>
            <CustomInput
                label="이메일"
                value={email}
                setValue={setEmail}
                placeholder="이메일"
                invalidFlag={emailError}
                invalidText="올바른 이메일을 입력해 주세요."
                maxLength={50}
            />
            <View style={{ marginTop: '2%' }}></View>
            <CustomButton
                style={styles.button}
                onPress={onAuthEmailPressed}
                bgColor={'#000'}
                text="인증 메일 받기"
                disabled={authButtonDisabled}
            />

            <View>
                <Text style={styles.smallText}>이메일을 못 받으셨나요?</Text>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <Text style={styles.smallText}>스팸편지함 확인 또는 </Text>
                    <Pressable onPress={onAuthEmailPressed}>
                        <Text style={[styles.smallText, { color: '#0DD36E' }]}>
                            인증 메일 다시 받기
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.button}>
                <CustomButton
                    onPress={onIsEmailAuthenticated}
                    disabled={nextButtonDisabled}
                    text="다음"
                />
                <CustomButton
                    onPress={() => {
                        navigation.navigate('SignUp', { email: email });
                    }}
                    text="테스트"
                />
            </View>
        </View>
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
    },
    smallText: { fontSize: 13, color: '#949494', textAlign: 'center' },
    button: {
        marginTop: '60%',
    },
});

export default AuthEmailScreen;
