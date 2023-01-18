import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

const SignUpSuccessScreen = () => {
    const navigation = useNavigation();

    const onOnboardPressed = () => {
        navigation.navigate('Onboard');
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = async () => {
                navigation.navigate('Onboard');
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                가입을 축하드려요!{'\n'}이제 나의 산을 기록하세요.
            </Text>
            <View style={styles.button}>
                <CustomButton
                    onPress={onOnboardPressed}
                    text="마운틴고 홈으로"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '10%',
        marginRight: '10%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 25,
        marginTop: '50%',
    },
    button: {
        marginBottom: '30%',
    },
});

export default SignUpSuccessScreen;
