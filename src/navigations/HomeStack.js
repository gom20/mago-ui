import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HikingScreen from '../screens/hiking/HikingScreen';
import HomeScreen from '../screens/hiking/HomeScreens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="MainTab"
            screenOptions={{
                headerTitle: '',
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Hiking"
                component={HikingScreen}
                options={{ headerShown: true, headerTransparent: true }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
