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
            <Text style={styles.text}>
                임시 비밀번호 발급을 위해 이메일과 이름을 입력해주세요.
            </Text>
            <Text style={styles.smallText}>
                본인확인 이메일 주소와 입력한 이메일 주소가 같아야, 임시
                비밀번호를 받을 수 있습니다.
            </Text>

            <CustomInput
                value={email}
                setValue={setEmail}
                placeholder="이메일"
                invalidFlag={emailError}
                invalidText="이메일을 입력해 주세요."
                maxLength={50}
            />
            <CustomInput
                value={name}
                setValue={setName}
                placeholder="이름"
                invalidFlag={nameError}
                invalidText="이름을 입력해 주세요."
                maxLength={50}
            />
            <CustomButton onPress={onSubmitPressed} text="임시 비밀번호 발급" />
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
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 29.3,
    },
    smallText: {
        fontSize: 12,
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 50,
    },
});

export default PwResetScreen;
