import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { updatePassword } from '../../slices/authSlice';
import { ModalContext } from '../../utils/ModalContext';

const PasswordChangeScreen = () => {
    const { showModal } = useContext(ModalContext);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordConfirmError, setNewPasswordConfirmError] =
        useState(false);

    const validateInputs = () => {
        let validFlag = true;

        setPassword((password) => password.trim());
        setNewPassword((newPassword) => newPassword.trim());
        setNewPasswordConfirm((newPasswordConfirm) =>
            newPasswordConfirm.trim()
        );

        if (password) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
            validFlag = false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        if (newPassword && passwordRegex.test(newPassword)) {
            setNewPasswordError(false);
        } else {
            setNewPasswordError(true);
            validFlag = false;
        }
        if (newPasswordConfirm && newPassword === newPasswordConfirm) {
            setNewPasswordConfirmError(false);
        } else {
            setNewPasswordConfirmError(true);
            validFlag = false;
        }
        return validFlag;
    };
    const onSubmitPressed = () => {
        if (!validateInputs()) return;

        dispatch(
            updatePassword({
                password: password,
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm,
            })
        )
            .unwrap()
            .then((response) => {
                showModal({
                    message: '비밀번호를 변경하였습니다.',
                });
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
                    <Text style={styles.text}>
                        비밀번호를{'\n'}변경합니다.{' '}
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <CustomInput
                        label="기존 비밀번호"
                        value={password}
                        setValue={setPassword}
                        placeholder="현재 사용중인 비밀번호"
                        secureTextEntry={true}
                        maxLength={20}
                        invalidFlag={passwordError}
                        invalidText="현재 사용중인 비밀번호를 입력해주세요."
                    />
                    <CustomInput
                        label="신규 비밀번호"
                        value={newPassword}
                        setValue={setNewPassword}
                        placeholder="영문자, 숫자 조합 8~20자"
                        secureTextEntry={true}
                        invalidFlag={newPasswordError}
                        invalidText="영문자, 숫자 조합으로 8자 이상 입력해주세요."
                        maxLength={20}
                    />
                    <CustomInput
                        label="신규 비밀번호 확인"
                        value={newPasswordConfirm}
                        setValue={setNewPasswordConfirm}
                        placeholder="비밀번호 확인"
                        secureTextEntry={true}
                        invalidFlag={newPasswordConfirmError}
                        invalidText="입력하신 비밀번호와 다릅니다."
                        maxLength={20}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={onSubmitPressed}
                        text="비밀번호 변경하기"
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

export default PasswordChangeScreen;
