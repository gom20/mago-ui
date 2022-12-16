import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const SignInScreen = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation(); 
	
	const onSignInPressed = () => {
		axios({
			method: 'post', 
			url: 'http://localhost:8080/members/login', 
			data: JSON.stringify({
				'id': 'rhaldud89@gmail.com',
				'password': 'test'
			}), 
			headers: {
				"Content-Type" : "application/json; charset=utf-8"
			},
			timeout: 5000
		})
		.then(function(response) {
			console.log("");
			console.log("RESPONSE : " + JSON.stringify(response.data));
			console.log("");
		})
		.catch(function(error) {
			console.log("");
			console.log("ERROR : " + JSON.stringify(error));
			console.log("");
		});
		
	};

	const onSignUpPressed = async (data) => {
		navigation.navigate('SignUp');
	}

	const onSocialLoginPressed = () => {
		console.warn("onSocialLoginPressed");
	};

	const onForgotPasswordPressed = () => {
		console.warn("onForgotPasswordPressed");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>안녕하세요,</Text>
			<Text style={styles.text}>MAGO 입니다.</Text>
			<Text style={styles.smallText}>서비스 이용을 위해 로그인 해주세요.</Text>

			<CustomInput
				value={username}
				setValue={setUsername}
				placeholder="Username"
			/>
			<CustomInput
				value={password}
				setValue={setPassword}
				placeholder="Password"
				secureTextEntry
			/>
			<CustomButton
				onPress={onSignInPressed}
				text="로그인"
			/>

			<View style={styles.line}/>

			<Pressable onPress={onSocialLoginPressed}>
				<Image 
					style={styles.image} 
					source={require('../assets/images/kakao_login_medium_wide.png')}
				/>
			</Pressable>

			<View style={styles.otherButtonContainer}>
				<Pressable onPress={onForgotPasswordPressed}>
					<Text style={styles.otherButtonText}>비밀번호 찾기  </Text>
				</Pressable>
				<Text style={styles.otherButtonText}>|</Text>
				<Pressable onPress={onSignUpPressed}>
					<Text style={styles.otherButtonText}>  회원가입하기</Text>
				</Pressable>
			</View>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
        marginTop: '40%',
        marginLeft: '9%',
		marginRight: '9%'
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: 29.3,
    },
    smallText: {
        fontSize: 12,
        fontWeight: '300',
        color: '#FFFFFF',
        marginTop: 5,
        marginBottom: 50,
        color: '#EEEEEE'
    },
	line: {
		borderBottomColor: '#FFFFFF',
		borderBottomWidth: 1,
		marginTop: '5%',
		marginBottom: '5%'
	},
	image: {
		width: '100%'
	},
	otherButtonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 15
	},
	otherButtonText: {
		fontWeight: '500',
		fontSize: 12,
		color: '#EEEEEE'
	}
 })

export default SignInScreen;