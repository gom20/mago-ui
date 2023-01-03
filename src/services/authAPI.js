import api from './api';

const signup = (request) => {
    return api.post('auth/signup', request).then((response) => {
        return response;
    });
};

const login = (request) => {
    return api.post('auth/login', request).then((response) => {
        return response;
    });
};

const logout = (request) => {
    return api.post('auth/logout', request).then(async (response) => {
        response;
    });
};

const sendPassword = (request) => {
    return api.post('auth/sendPassword', request).then(async (response) => {
        response;
    });
};

const refreshToken = (request) => {
    return api.post('auth/refresh', request).then((response) => {
        return response;
    });
};

const authAPI = {
    signup,
    login,
    logout,
    sendPassword,
    refreshToken,
};

export default authAPI;
