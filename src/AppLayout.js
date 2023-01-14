import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import LoadingIndicator from './components/LoadingIndicator';
import AppStack from './navigations/AppStack';
import api from './services/api';
import { hideLoading, showLoading } from './slices/loadingSlice';
import { store } from './store';
import { ModalContext } from './utils/ModalContext';

export default function AppLayout() {
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { showModal } = useContext(ModalContext);

    useEffect(() => {
        api.interceptors.request.use(
            async function (config) {
                dispatch(showLoading());
                const accessToken = store.getState().auth.accessToken;
                if (accessToken) {
                    config.headers.Authorization = accessToken;
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
                dispatch(hideLoading());
                return response.data;
            },
            async function (error) {
                const {
                    config,
                    response: { status },
                } = error;
                if (status === 401) {
                    // TODO: Refresh Token 발급 요청
                    // const originalRequest = config;
                    // const accessToken = store.getState().auth.accessToken;
                    // const refreshToken = store.getState().auth.refreshToken;
                    // // token refresh 요청
                    // try {
                    //     const { response } = await authAPI.refreshToken({
                    //         accessToken: accessToken,
                    //         refreshToken: refreshToken,
                    //     });
                    //     store.getState().auth.accessToken =
                    //         response.data.accessToken;
                    //     store.getState().auth.refreshToken =
                    //         response.data.refreshToken;
                    // } catch {
                    //     store.getState().auth.accessToken = null;
                    //     store.getState().auth.refreshToken = null;
                    // }
                    // return axios(originalRequest);
                } else {
                    dispatch(hideLoading());
                    const errorMsg =
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                            ? error.response.data.message
                            : error.message || error.toString();
                    showModal({ message: errorMsg });
                }
                return Promise.reject(error.resposne || error);
            }
        );
    }, []);

    return (
        <>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
            <LoadingIndicator />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
