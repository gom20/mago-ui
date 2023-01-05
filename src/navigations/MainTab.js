import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import DiaryScreen from '../screens/feed/FeedListScreen';
import HomeScreen from '../screens/hiking/HomeScreens';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
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
            <Tab.Screen name="홈" component={HomeScreen} />
            <Tab.Screen name="나의 산 기록" component={DiaryScreen} />
            <Tab.Screen name="도전 100대 명산" component={DiaryScreen} />
            <Tab.Screen name="마이" component={DiaryScreen} />
        </Tab.Navigator>
    );
};

export default MainTab;
