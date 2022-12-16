import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomTopbar from '../components/CustomTopbar';

const SignUpScreen = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<View style={styles.container}>
			<Text style={styles.text}>회원가입</Text>
			<Text style={styles.label}>Username</Text>
			<CustomInput
				value={username}
				setValue={setUsername}
				placeholder="이메일 주소"
			/>
			<Text style={styles.label}>Password</Text>
			<CustomInput
				value={password}
				setValue={setPassword}
				placeholder="8자 이상, 특수문자 포함"
			/>
			<Text style={styles.label}>Confirm Password</Text>
			<CustomInput
				value={confirmPassword}
				setValue={setConfirmPassword}
				placeholder="8자 이상, 특수문자 포함"
			/>
			<View style={{ marginTop: "5%"}}></View>
			<CustomButton 
				onPress={onSignUpPressed}
				text="회원가입"
			/>
		</View>
    );
}

const onExitPressed = () => {
	console.warn("onExitPressed");
}

const onSignUpPressed = () => {
	console.warn("Sign Up!");
};

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
		fontSize: 14,
        color: '#FFFFFF',
        lineHeight: 29.3,
	}
 })
    

export default SignUpScreen;