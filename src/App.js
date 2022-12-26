import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import api from './apis/api';
import LoadingIndicator from './components/LoadingIndicator';
import AppStack from './navigations/AppStack';
import { store } from './store';

export default function App() {
    const [loading, setLoading] = useState(false);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function delaySplash() {
        await SplashScreen.preventAutoHideAsync();
        await sleep(5000);
        await SplashScreen.hideAsync();
    }

    useEffect(() => {
        // delaySplash();

        api.interceptors.request.use(
            function (config) {
                setLoading(true);
                config.request = JSON.stringify(config.request);
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

        api.interceptors.response.use(
            function (response) {
                setLoading(false);
                return response.data;
            },
            function (error) {
                setLoading(false);
                const errorMsg =
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                        ? error.response.data.message
                        : error.message || error.toString();
                alert(errorMsg);
                return Promise.reject(error);
            }
        );
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
            <LoadingIndicator loading={loading} />
        </Provider>
    );
}
