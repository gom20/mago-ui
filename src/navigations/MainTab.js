import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/hiking/HomeScreens';
import AccountStack from './AccountStack';
import RecordStack from './RecordStack';
import StampStack from './StampStack';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#0DD36E',
                tabBarInactiveTintColor: '#949494',
                tabBarStyle: {
                    backgroundColor: '#FBFBFB',
                },
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === '홈') {
                        iconName = 'home';
                    } else if (route.name === '나의 산 기록') {
                        iconName = 'format-list-bulleted';
                    } else if (route.name === '도전 100대 명산') {
                        iconName = 'flag-variant';
                    } else if (route.name === '마이') {
                        iconName = 'account-circle';
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
        >
            <Tab.Screen
                name="홈"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="나의 산 기록"
                component={RecordStack}
                options={{
                    headerShown: false,
                    // tabBarStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="도전 100대 명산"
                component={StampStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="마이"
                component={AccountStack}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
