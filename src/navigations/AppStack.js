import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/auth/LoginScreen';
import OnboardScreen from '../screens/auth/OnboardScreen';
import SendTempPasswordScreen from '../screens/auth/SendTempPasswordScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignUpSuccessScreen from '../screens/auth/SignUpSucessScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';
import HomeStack from './HomeStack';

const Stack = createStackNavigator();

const AppStack = () => {
    const auth = useSelector((state) => state.auth);
    const initScreen = auth.isLogin ? 'Home' : 'Onboard';

    return (
        <Stack.Navigator
            initialRouteName={initScreen}
            screenOptions={{
                headerTitle: '',
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen
                name="Onboard"
                component={OnboardScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="VerifyEmail"
                component={VerifyEmailScreen}
                options={{
                    headerShown: true,
                    headerTitle: '본인 인증',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="SignUpSuccess"
                component={SignUpSuccessScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SendTempPassword"
                component={SendTempPasswordScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Home"
                component={HomeStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
export default AppStack;
