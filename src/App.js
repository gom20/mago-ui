import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppLayout from './AppLayout';
import { persistor, store } from './store';
import { ModalProvider } from './utils/ModalContext';

export default function App() {
    return (
        // <SafeAreaView style={styles.container}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ModalProvider>
                    <AppLayout />
                </ModalProvider>
            </PersistGate>
        </Provider>
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
