import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from './components/LoadingIndicator';
import getEnvVars from './environment';
import AppStack from './navigations/AppStack';
import api from './services/api';
import { refresh, resetAuth } from './slices/authSlice';
import { hideLoading, showLoading } from './slices/loadingSlice';
import { store } from './store';
import { ModalContext } from './utils/ModalContext';

export default function AppLayout() {
    const dispatch = useDispatch();
    const { showModal } = useContext(ModalContext);
    const navigation = useNavigation();

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
                if (
                    error.response &&
                    error.response.status &&
                    error.response.status === 403
                ) {
                    try {
                        const originalConfig = error.config;
                        const resp = await axios.post(
                            getEnvVars().apiDomain + '/api/auth/refresh',
                            JSON.stringify({
                                accessToken: store.getState().auth.accessToken,
                                refreshToken:
                                    store.getState().auth.refreshToken,
                            }),
                            {
                                headers: {
                                    'Content-Type':
                                        'application/json; charset=utf-8',
                                },
                            }
                        );
                        if (resp) {
                            console.log('[AppLayout] refresh API completed');
                            dispatch(
                                refresh({
                                    accessToken: resp.data.data.accessToken,
                                    refreshToken: resp.data.data.refreshToken,
                                })
                            );
                            return await api.request(originalConfig);
                        }
                    } catch (error) {
                        dispatch(hideLoading());
                        dispatch(resetAuth());
                        await showModal({
                            async: true,
                            message:
                                '로그인 기간이 만료되었습니다. \n 재 로그인 해주세요.',
                        });
                        navigation.reset({ routes: [{ name: 'Onboard' }] });
                    }
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
    }, [navigation]);

    return (
        <>
            <AppStack />
            <LoadingIndicator />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
