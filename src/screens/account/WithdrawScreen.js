import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { withdraw } from '../../slices/authSlice';
import { ModalContext } from '../../utils/ModalContext';

const WithdrawScreen = () => {
    const { showModal } = useContext(ModalContext);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [isChecked, setChecked] = useState(false);
    const [password, setPassword] = useState('');

    const onSubmitPressed = () => {
        dispatch(
            withdraw({
                password: password,
            })
        )
            .unwrap()
            .then(async (response) => {
                await showModal({
                    message: '탈퇴가 완료되었습니다.',
                    async: true,
                });
                navigation.navigate('Onboard');
            })
            .catch((error) => {});
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}
        >
            <View>
                <Text style={styles.text}>
                    탈퇴하기 전{'\n'}다시 한번 확인해 주세요.{' '}
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 10,
                    }}
                >
                    <Entypo name="warning" size={20} color="black" />
                    <Text style={{ marginHorizontal: 5 }}>
                        탈퇴하시면 등록된 모든 데이터는 즉시 삭제되어 복구가
                        불가능합니다.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#000' : undefined}
                    />
                    <Text
                        style={{
                            marginHorizontal: 5,
                            marginBottom: 20,
                        }}
                    >
                        안내 사항을 확인하였으며, 이에 동의합니다.
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <CustomInput
                    label="비밀번호"
                    value={password}
                    setValue={setPassword}
                    placeholder="비밀번호"
                    secureTextEntry={true}
                    maxLength={20}
                />

                <CustomButton
                    onPress={onSubmitPressed}
                    text="탈퇴하기"
                    disabled={!isChecked || !password}
                />
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
    },
    contentContainer: {
        marginTop: '20%',
        marginBottom: '20%',
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29.3,
        marginBottom: '8%',
    },
    smallText: {
        fontSize: 13,
        color: '#949494',
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonContainer: {
        marginBottom: '20%',
    },
});

export default WithdrawScreen;
