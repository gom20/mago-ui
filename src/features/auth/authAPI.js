import api from '../../base/api';
import { AsyncAlert } from '../../utils/AsyncAlert';

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
        await AsyncAlert('Alert', '로그아웃 되었습니다.');
        return response;
    });
};

const sendPassword = (request) => {
    return api.post('auth/sendPassword', request).then(async (response) => {
        await AsyncAlert('Alert', '임시 비밀번호가 전송되었습니다.');
        return response;
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
