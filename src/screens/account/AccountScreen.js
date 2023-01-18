import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { ModalContext } from '../../utils/ModalContext';

const AccountScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { showModal } = useContext(ModalContext);
    const user = useSelector((state) => state.auth.user);

    const onLogoutPressed = async () => {
        const response = await showModal({
            message: '로그아웃 하시겠습니까',
            type: 'confirm',
            async: true,
            buttonTexts: ['취소', '확인'],
        });
        if (response) {
            dispatch(logout())
                .unwrap()
                .then(async (response) => {
                    await showModal({
                        message: '로그아웃이 완료되었습니다.',
                        async: true,
                    });
                    navigation.reset({ routes: [{ name: 'Onboard' }] });
                })
                .catch((error) => {});
        } else {
            return;
        }
    };

    const onPasswordChangePressed = () => {
        navigation.navigate('UpdatePassword');
    };

    const onWithdrawPressed = () => {
        navigation.navigate('Withdraw');
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={onLogoutPressed}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                    }}
                >
                    <MaterialIcons name="logout" size={20} color="black" />
                    <Text style={{ fontSize: 10 }}>로그아웃</Text>
                </Pressable>
            ),
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.accountContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={[styles.text, { fontWeight: '600' }]}>
                        {user ? user.name : ''}
                    </Text>
                    <Text style={styles.text}>님</Text>
                </View>
                <Text style={[styles.text, { marginBottom: '5%' }]}>
                    안녕하세요!
                </Text>
                <Text style={[styles.smallText, { marginBottom: '5%' }]}>
                    {user ? user.email : ''}
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: '20%' }}>
                    <TouchableOpacity onPress={onPasswordChangePressed}>
                        <Text style={styles.smallText}>비밀번호 변경</Text>
                    </TouchableOpacity>
                    <Text style={styles.smallText}>
                        {'   '}|{'   '}
                    </Text>
                    <TouchableOpacity onPress={onWithdrawPressed}>
                        <Text style={styles.smallText}>탈퇴하기</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/images/my-icon.png')}
                    resizeMode="cover"
                    style={{ width: 100, height: 100, marginBottom: '5%' }}
                ></Image>

                <Text style={styles.smallText}>
                    현재 버전 {Constants.manifest.version} {'\n'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    accountContainer: {
        marginTop: '10%',
        // marginBottom: '40%',
        alignItems: 'center',
    },
    welcomeContainer: {
        flexDirection: 'row',
    },
    textUnderline: { textDecorationLine: 'underline' },
    text: {
        fontSize: 27,
        fontWeight: '400',
    },
    smallText: {
        color: '#949494',
        marginBottom: '5%',
        textAlign: 'center',
    },
    mediumText: {
        fontSize: 20,
    },
    valueText: {
        color: '#0DD36E',
        fontWeight: '600',
    },
    recordItem: {
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 15,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
    },
});

export default AccountScreen;
