import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountScreen from '../screens/account/AccountScreen';
import RecordListScreen from '../screens/record/RecordListScreen';
import HomeScreen from '../screens/hiking/HomeScreens';
import RecordStack from './RecordStack';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // headerShown: false,
                // tabBarAtiveTintColor: '#0DD36E',
                // tabBarInactiveTintColor: '#949494',
                tabBarStyle: {
                    backgroundColor: '#FBFBFB',
                },
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === '홈') {
                        iconName = 'home';
                    } else if (route.name === '나의 산 기록') {
                        iconName = 'calendar-check';
                    } else if (route.name === '도전 100대 명산') {
                        iconName = 'hiking';
                    } else if (route.name === '마이') {
                        iconName = 'account';
                    }
                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        ></MaterialCommunityIcons>
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: '#0DD36E',
                inactiveTintColor: '#949494',
            }}
        >
            <Tab.Screen
                name="홈"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="나의 산 기록"
                component={RecordStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="도전 100대 명산"
                component={RecordListScreen}
                options={{ headerTitleAlign: 'center' }}
            />
            <Tab.Screen
                name="마이"
                component={AccountScreen}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
