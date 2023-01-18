import api from './api';

const login = (request) => {
    return api.post('auth/login', request).then((response) => {
        return response;
    });
};

const logout = (request) => {
    return api.post('auth/logout', request).then((response) => {
        return response;
    });
};

const refresh = (request) => {
    return api.post('auth/refresh', request).then((response) => {
        return response;
    });
};

const sendVerificationEmail = (request) => {
    return api.post('auth/sendVerificationEmail', request).then((response) => {
        return response;
    });
};

const isVerifiedEmail = (params) => {
    return api
        .get('auth/isVerifiedEmail', { params: params })
        .then((response) => {
            return response;
        });
};

const authAPI = {
    login,
    logout,
    refresh,
    sendVerificationEmail,
    isVerifiedEmail,
};

export default authAPI;
