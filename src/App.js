import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLayout from './AppLayout';
import { persistor, store } from './store';
import { ModalProvider } from './utils/ModalProvider';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        Jalnan: require('./assets/fonts/Jalnan.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView} style={styles.container}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ModalProvider>
                        <AppLayout />
                    </ModalProvider>
                </PersistGate>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
