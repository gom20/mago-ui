import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DiaryScreen from '../screens/DiaryScreen'
import HikingScreen from '../screens/HikingScreen'
import GpsScreen from '../screens/GpsScreen'
import RecordScreen from '../screens/RecordScreen'

const Stack = createStackNavigator();
const HikingStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

const HikingComponent = () => {
    return (
        <HikingStack.Navigator 
            initialRouteName="Hiking"
            screenOptions = {{ cardStyle: {backgroundColor: 'skyblue'}}}>
            <HikingStack.Screen name = "Hiking" component={HikingScreen} options={{headerShown: false}}/>
            <HikingStack.Screen name = "Gps" component={GpsScreen} options={{headerShown: false}}/>
            <HikingStack.Screen name = "Record" component={RecordScreen} options={{headerShown: false}}/>
        </HikingStack.Navigator>
    );
  };

const AppTabComponent = () => {
    return (
      <MainScreenTab.Navigator>
        <MainScreenTab.Screen name="HikingStack" component={HikingComponent} />
        <MainScreenTab.Screen name="기록보기" component={DiaryScreen} />
      </MainScreenTab.Navigator>
    );
  };

const AuthStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="SignIn"
            screenOptions = {{ cardStyle: {backgroundColor: 'skyblue'}}}>
            <Stack.Screen name = "SignIn" component={SignInScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "SignUp" component={SignUpScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "AppTabComponent" component={AppTabComponent}/>
        </Stack.Navigator>
    );
};

export default AuthStack;