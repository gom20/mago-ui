import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DiaryScreen from '../screens/DiaryScreen';
import GpsScreen from '../screens/GpsScreen';
import HikingScreen from '../screens/HikingScreen';
import RecordScreen from '../screens/FeedScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PwResetScreen from '../screens/PwResetScreen';

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
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PwReset"
                component={PwResetScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AppTabComponent" component={AppTabComponent} />
        </Stack.Navigator>
    );
};

export default AppStack;
