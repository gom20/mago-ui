import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RecordDetailScreen from '../screens/record/RecordDetailScreen';
import RecordListScreen from '../screens/record/RecordListScreen';

const Stack = createStackNavigator();

const RecordStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="RecordList"
            screenOptions={{
                headerTitleAlign: 'center',
                headerShown: true,
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen
                name="RecordList"
                component={RecordListScreen}
                options={{ headerTitle: '나의 산 기록' }}
            />
            <Stack.Screen
                name="RecordDetail"
                component={RecordDetailScreen}
                options={{ headerTitle: '기록 상세 보기' }}
            />
        </Stack.Navigator>
    );
};

export default RecordStack;
