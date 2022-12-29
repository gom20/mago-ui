import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import { logout } from './../auth/authSlice';
import { useNavigation } from '@react-navigation/native';

const HikingScreen = () => {
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onLogoutPressed = () => {
        console.error('logoutTest');
        navigation.navigate('SignIn');
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <Pressable>
                <Button onPress={onLogoutPressed} title="logout"></Button>
            </Pressable>
            {/* {auth.isLogged} && (<Text> 환영합니다.</Text>) */}
            <List />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '9%',
        marginLeft: '9%',
        marginRight: '9%',
    },
});

export default HikingScreen;
