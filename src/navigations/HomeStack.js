import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HikingScreen from '../screens/hiking/HikingScreen';
import HomeScreen from '../screens/hiking/HomeScreens';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTitle: '',
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Hiking"
                component={HikingScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
