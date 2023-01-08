import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { ModalContext } from '../../utils/ModalContext';

const OnboardScreen = () => {
    const { showModal } = useContext(ModalContext);
    const navigation = useNavigation();

    const onLoginPressed = () => {
        navigation.navigate('Login');
    };

    const onSignUpPressed = async (data) => {
        navigation.navigate('SignUp');
    };

    const onSocialLoginPressed = async () => {};

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/mountain_bg.jpg')}
                resizeMode="cover"
                style={styles.bg}
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.headlineText}>마운틴고</Text>
                    <Text style={styles.text}>나의 산을 기록하다</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={onSignUpPressed}
                        text="이메일로 가입하기"
                        iconType="mail-outline"
                    />
                    <CustomButton
                        onPress={onLoginPressed}
                        text="이메일로 로그인"
                        iconType="login"
                        bgColor="#FFFFFF"
                        textColor="#0DD36E"
                    />

                    <View style={styles.line} />

                    <Text style={styles.smallText}> 간편하게 시작하기 </Text>
                    <Pressable
                        onPress={onSocialLoginPressed}
                        style={styles.circle}
                    >
                        <Image
                            style={styles.kakao}
                            source={require('../../assets/images/kakao-icon.png')}
                        />
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    logoContainer: {
        marginTop: '30%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    buttonContainer: {
        marginBottom: '30%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    headlineText: {
        color: '#FFFFFF',
        fontSize: 30,
        // fontWeight: '300',
        fontFamily: 'Jalnan',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: '300',
    },
    smallText: {
        color: '#949494',
        alignSelf: 'center',
        marginBottom: '5%',
    },
    line: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginTop: '5%',
        marginBottom: '5%',
    },
    circle: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        paddingLeft: 12,
        paddingTop: 13,
        backgroundColor: '#FEE500',
        borderRadius: 25,
    },
    kakao: {
        width: 25,
        height: 23,
    },
});

export default OnboardScreen;
