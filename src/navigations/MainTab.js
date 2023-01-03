import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import DiaryScreen from '../screens/feed/FeedListScreen';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FBFBFB',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === '홈') {
                        iconName = 'home';
                    } else if (route.name === '나의 산 기록') {
                        iconName = 'calendar-check';
                    } else if (route.name === '주변 산 목록') {
                        iconName = 'map-marker-radius';
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
            <Tab.Screen name="홈" component={HomeStack} />
            <Tab.Screen name="나의 산 기록" component={DiaryScreen} />
            <Tab.Screen name="주변 산 목록" component={DiaryScreen} />
            <Tab.Screen name="도전 100대 명산" component={DiaryScreen} />
            <Tab.Screen name="마이" component={DiaryScreen} />
        </Tab.Navigator>
    );
};

export default MainTab;
