import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import AppStack from './navigations/AppStack';
import { store } from './store';
import { Provider } from 'react-redux';

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
        <Provider store={store}>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </Provider>
    );
}
