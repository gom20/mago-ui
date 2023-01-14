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
    return api.post('auth/logout', request).then((response) => {
        return response;
    });
};

const sendPassword = (request) => {
    return api.post('auth/sendPassword', request).then((response) => {
        return response;
    });
};

const refreshToken = (request) => {
    return api.post('auth/refresh', request).then((response) => {
        return response;
    });
};

const changePassword = (request) => {
    return api.post('auth/changePassword', request).then((response) => {
        return response;
    });
};

const withdraw = (request) => {
    return api.post('auth/withdraw', request).then((response) => {
        return response;
    });
};

const sendAuthEmail = (request) => {
    return api.post('auth/sendConfirmEmail', request).then((response) => {
        return response;
    });
};

const isEmailAthenticated = (params) => {
    return api
        .get('auth/isEmailAthenticated', { params: params })
        .then((response) => {
            return response;
        });
};

const authAPI = {
    signup,
    login,
    logout,
    sendPassword,
    refreshToken,
    changePassword,
    withdraw,
    sendAuthEmail,
    isEmailAthenticated,
};

export default authAPI;
