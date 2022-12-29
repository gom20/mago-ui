import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import api from './base/api';
import LoadingIndicator from './components/LoadingIndicator';
import AppStack from './navigations/AppStack';
import { store, persistor } from './store';

export default function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.interceptors.request.use(
            async function (config) {
                setLoading(true);
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
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
                return Promise.reject(error.resposne || error);
            }
        );
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <AppStack />
                </NavigationContainer>
                <LoadingIndicator loading={loading} />
            </PersistGate>
        </Provider>
    );
}
