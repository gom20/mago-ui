import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import AuthStack from './navigations/AppStack';

export default function App() {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function delay_splash() {
        await SplashScreen.preventAutoHideAsync();
        await sleep(3000);
        await SplashScreen.hideAsync();
    }

    useEffect(() => {
        delay_splash();
    });

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}
