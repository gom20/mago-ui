import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DiaryScreen from '../features/feed/FeedListScreen';
import GpsScreen from '../features/hiking/GpsScreen';
import HikingScreen from '../features/hiking/HikingScreen';
import RecordScreen from '../features/feed/FeedScreen';
import LoginScreen from '../features/auth/LoginScreen';
import SignUpScreen from '../features/auth/SignUpScreen';
import PasswordReset from '../features/auth/PasswordResetScreen';
import { useSelector } from 'react-redux';
import OnboardScreen from '../features/auth/OnboardScreen';
import SignUpSuccessScreen from '../features/auth/SignUpSucessScreen';
import { Image } from 'react-native';

const Stack = createStackNavigator();
const HikingStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

const HikingComponent = () => {
    return (
        <HikingStack.Navigator initialRouteName="Hiking">
            <HikingStack.Screen
                name="Hiking"
                component={HikingScreen}
                options={{ headerShown: false }}
            />
            <HikingStack.Screen
                name="Gps"
                component={GpsScreen}
                options={{ headerShown: false }}
            />
            <HikingStack.Screen
                name="Record"
                component={RecordScreen}
                options={{ headerShown: false }}
            />
        </HikingStack.Navigator>
    );
};

const AppTabComponent = () => {
    return (
        <MainScreenTab.Navigator>
            <MainScreenTab.Screen
                name="HikingStack"
                component={HikingComponent}
            />
            <MainScreenTab.Screen name="Diary" component={DiaryScreen} />
        </MainScreenTab.Navigator>
    );
};

const AppStack = () => {
    const auth = useSelector((state) => state.auth);
    const initScreen = auth.isLogged ? 'AppTabComponent' : 'Onboard';

    return (
        <Stack.Navigator
            initialRouteName={initScreen}
            screenOptions={{
                headerTitle: '',
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
                headerBackImage: () => (
                    <Image
                        source={require('../assets/images/back_button.png')}
                    ></Image>
                ),
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
            <Stack.Screen name="AppTabComponent" component={AppTabComponent} />
        </Stack.Navigator>
    );
};

export default AppStack;
