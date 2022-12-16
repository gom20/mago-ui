import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="SignIn"
            screenOptions = {{ cardStyle: {backgroundColor: 'skyblue'}}}>
            <Stack.Screen name = "SignIn" component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default AuthStack;