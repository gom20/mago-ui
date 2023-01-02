import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { sendPassword } from './authSlice';

const PwResetScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);

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
            sendPassword({
                email: email,
                name: name,
            })
        )
            .unwrap()
            .then((response) => {
                navigation.navigate('SignIn');
            })
            .catch((error) => {});
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>비밀번호 재설정</Text>
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
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    inputContainer: {
        marginTop: '20%',
        marginBottom: '30%',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29.3,
        marginBottom: '8%',
        alignSelf: 'center',
    },
    smallText: { fontSize: 13, color: '#949494', textAlign: 'center' },
    buttonContainer: {
        marginBottom: '20%',
    },
});

export default PwResetScreen;
