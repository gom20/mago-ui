import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../screens/account/AccountScreen';
import UpdatePasswordScreen from '../screens/account/UpdatePasswordScreen';
import WithdrawScreen from '../screens/account/WithdrawScreen';

const Stack = createStackNavigator();

const AccountStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Account"
            screenOptions={{
                headerTitleAlign: 'center',
                headerShown: true,
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerShown: true,
                    headerTitle: '마이페이지',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="UpdatePassword"
                component={UpdatePasswordScreen}
                options={{
                    headerTitle: '비밀번호 변경',
                }}
            />
            <Stack.Screen
                name="Withdraw"
                component={WithdrawScreen}
                options={{
                    headerTitle: '탈퇴하기',
                }}
            />
        </Stack.Navigator>
    );
};

export default AccountStack;
