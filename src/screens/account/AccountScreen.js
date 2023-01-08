import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { ModalContext } from '../../utils/ModalContext';

const AccountScreen = () => {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { showModal } = useContext(ModalContext);

    const onLogoutPressed = async () => {
        const response = await showModal({
            message: '로그아웃 하시겠습니까',
            type: 'confirm',
            async: true,
            buttonTexts: ['취소', '확인'],
        });
        if (!response) {
            dispatch(logout())
                .unwrap()
                .then((response) => {
                    navigation.navigate('Login');
                })
                .catch((error) => {});
        } else {
            return;
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}
        >
            <View>
                <View style={styles.accountContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={[styles.text, { fontWeight: '600' }]}>
                            {user ? user.name : ''}
                        </Text>
                        <Text style={styles.text}>님</Text>
                    </View>
                    <Text style={[styles.text, { marginBottom: '2%' }]}>
                        안녕하세요!
                    </Text>
                    <Text style={[styles.smallText, { marginBottom: '10%' }]}>
                        {user ? user.email : ''}
                    </Text>
                    <TouchableOpacity onPress={onLogoutPressed}>
                        <Text style={styles.smallText}>로그아웃</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text style={styles.smallText}>비밀번호 변경</Text>
                        </TouchableOpacity>
                        <Text style={styles.smallText}>
                            {'   '}|{'   '}
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.smallText}>탈퇴하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.recordContainer}>
                    <View style={styles.recordItem}>
                        <Text style={styles.mediumText}>
                            오늘까지 나의 등산은
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.mediumText, styles.valueText]}>
                                10번째
                            </Text>
                            <Text style={styles.mediumText}> 입니다.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.recordContainer}>
                    <View style={styles.recordItem}>
                        <Text style={styles.mediumText}>도전 100대 명산</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.mediumText, styles.valueText]}>
                                60
                            </Text>
                            <Text style={styles.mediumText}> / 100</Text>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
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
        marginTop: '20%',
        marginBottom: '40%',
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
