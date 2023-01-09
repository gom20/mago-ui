import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RecordDetailScreen from '../screens/record/RecordDetailScreen';
import RecordListScreen from '../screens/record/RecordListScreen';
import StampDetailScreen from '../screens/stamp/StampDetailScreen';
import StampMainScreen from '../screens/stamp/StampMainScreen';

const Stack = createStackNavigator();

const StampStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="StampMain"
            screenOptions={{
                headerTitleAlign: 'center',
                headerShown: true,
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen
                name="StampMain"
                component={StampMainScreen}
                options={{ headerTitle: '도전 100대 명산' }}
            />
            <Stack.Screen
                name="StampDetail"
                component={StampDetailScreen}
                options={{ headerTitle: '도전 100대 명산' }}
            />
        </Stack.Navigator>
    );
};

export default StampStack;
