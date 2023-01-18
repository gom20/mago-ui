import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { sendTempPassword } from '../../slices/authSlice';
import { ModalContext } from '../../utils/ModalContext';

const SendTempPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const { showModal } = useContext(ModalContext);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSubmitPressed = () => {
        const _validateInputs = () => {
            email ? setEmailError(false) : setEmailError(true);
            name ? setNameError(false) : setNameError(true);
            return email && name ? true : false;
        };
        if (!_validateInputs()) return;

        dispatch(
            sendTempPassword({
                email: email,
                name: name,
            })
        )
            .unwrap()
            .then(async (response) => {
                await showModal({
                    message: '입력하신 이메일로 임시비밀번호가 전송되었습니다.',
                    async: true,
                });
                navigation.navigate('Login');
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
                <View>
                    <Text style={styles.text}>임시 비밀번호 발급</Text>
                    <Text style={styles.smallText}>
                        회원가입 시 작성한 이메일과 이름을 입력해주세요.
                    </Text>
                </View>
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
                        value={name}
                        setValue={setName}
                        placeholder="이름"
                        invalidFlag={nameError}
                        invalidText="이름을 입력해 주세요."
                        maxLength={50}
                        label="이름"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={onSubmitPressed}
                        text="임시 비밀번호 발급"
                    />
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
    smallText: {
        fontSize: 13,
        color: '#949494',
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonContainer: {
        marginBottom: '20%',
    },
});

export default SendTempPasswordScreen;
