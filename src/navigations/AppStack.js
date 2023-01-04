import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import PasswordReset from '../screens/auth/PasswordResetScreen';
import { useSelector } from 'react-redux';
import OnboardScreen from '../screens/auth/OnboardScreen';
import SignUpSuccessScreen from '../screens/auth/SignUpSucessScreen';
import { Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MainTab from './MainTab';
import HomeScreen from '../screens/hiking/HomeScreens';
import HomeStack from './HomeStack';

const Stack = createStackNavigator();

const AppStack = () => {
    const auth = useSelector((state) => state.auth);
    const initScreen = auth.isLogged ? 'Home' : 'Onboard';

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
                name="PasswordReset"
                component={PasswordReset}
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
