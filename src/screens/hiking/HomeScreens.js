import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import { logout } from '../../slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const HomeScreen = () => {
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onLogoutPressed = () => {
        navigation.navigate('Login');
        dispatch(logout());
    };

    const onHikingPressed = () => {
        navigation.navigate('Hiking');
    };

    const onPostPressed = () => {
        navigation.navigate('Hiking');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/mago_logo_green.png')}
                    style={styles.logo}
                ></Image>
                <Text style={styles.text}>오늘의 산은{'\n'}어디인가요?</Text>
                <Text style={styles.smallText}>
                    주변 산을 찾아보세요.{'\n'}오늘도 안전하게 즐겁게 마운틴고!
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton onPress={onHikingPressed} text="등산하기" />
                <CustomButton onPress={onHikingPressed} text="나의 산 이야기" />
                <CustomButton onPress={onLogoutPressed} text="임시 로그아웃" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
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
    text: {
        fontSize: 28,
        fontWeight: '300',
    },
    smallText: {
        color: '#949494',
        marginBottom: '5%',
    },
});

export default HomeScreen;
