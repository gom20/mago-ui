import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Modal } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import getEnvVars from '../environment';

const SignUpScreen = () => {
    const ENV = getEnvVars();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const navigation = useNavigation(); 

    const onChangeUsername = () => {
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!username || emailRegex.test(username)) setUsernameError(false);
        else setUsernameError(true);
    };
    const onChangePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if ((!password || (passwordRegex.test(password)))) setPasswordError(false);
        else setPasswordError(true);

        if (!confirmPassword || password === confirmPassword) setConfirmPasswordError(false);
        else setConfirmPasswordError(true);
    };
    const onChangeConfirmPassword = () => {
        if (password === confirmPassword) setConfirmPasswordError(false);
        else setConfirmPasswordError(true);
    };

	const validation = () => {
        if(!username) setUsernameError(true);
        if(!password) setPasswordError(true);
        if(!confirmPassword) setConfirmPasswordError(true);

        if(username && password && confirmPassword) return true;
        else return false;
    }

	const onSignUpPressed = () => {
        // if(!validation()) {
        //     alert('ui error')
        //     return;
        // }
        axios({
			method: 'post', 
			url: ENV.apiDomain + '/api/members', 
			data: JSON.stringify({
				'username': username,
				'password': password
			}), 
			headers: {
				"Content-Type" : "application/json; charset=utf-8"
			},
        }).then(function(response) {
            console.error(response)
            if(response.data.code == 0) {
                navigation.navigate('SignIn');
            } else {
                alert('server error')
            }
        }).catch(function (error) {
            alert('undefined error')
        });
    }

	return (
		<View style={styles.container}>
			<Text style={styles.text}>회원가입</Text>
			<Text style={styles.label}>이메일 주소</Text>
			<CustomInput
				value={username}
				setValue={setUsername}
                onChange={onChangeUsername}
				placeholder="이메일 주소" 
			/>
            {usernameError && <Text style={styles.invalid}> 사용자 계정은 고유한 이메일 주소를 사용해야 합니다. </Text>} 
			<Text style={styles.label}>비밀번호</Text>
			<CustomInput
				value={password}
				setValue={setPassword}
                onChange={onChangePassword}
				placeholder="8자 이상, 특수문자 포함"
                secureTextEntry={true}
			/>
            {passwordError && <Text style={styles.invalid}> 비밀번호는 8자 이상, 숫자가 포함되어야 합니다. </Text>} 
			<Text style={styles.label}>비밀번호 확인</Text>
			<CustomInput
				value={confirmPassword}
				setValue={setConfirmPassword}
                onChange={onChangeConfirmPassword}
				placeholder="8자 이상, 특수문자 포함"
                secureTextEntry={true}
			/>
            {confirmPasswordError && <Text style={styles.invalid}> 비밀번호가 동일하지 않습니다. </Text>} 
			<View style={{ marginTop: "5%"}}></View>
			<CustomButton 
				onPress={onSignUpPressed}
				text="회원가입"
			/>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		marginTop: '30%',
        marginLeft: '9%',
		marginRight: '9%'
	},
    text: {
        fontSize: 25,
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: 29.3,
		marginBottom:'5%'
    },
	label: {
        marginTop: '1%',
		fontSize: 14,
        color: '#FFFFFF',
        lineHeight: 29.3,
	}, 
    invalid: {
        fontSize: 11,
        color: 'blue'
    }
 })
    

export default SignUpScreen;