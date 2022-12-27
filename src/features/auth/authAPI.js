import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncAlert } from '../../utils/AsyncAlert';
import api from '../../base/api';

const signup = (request) => {
    return api.post('auth/signup', request).then(async (response) => {
        await AsyncAlert('Alert', '가입 되었습니다.');
        return response;
    });
};

const login = (request) => {
    return api.post('auth/login', request).then(async (response) => {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
    });
};

const sendPassword = (request) => {
    return api.post('auth/sendPassword', request).then(async (response) => {
        await AsyncAlert(
            'Alert',
            '임시 비밀번호가 전송되었습니다. 로그인 후 비밀번호를 변경해주세요.'
        );
        return response;
    });
};

const authAPI = {
    signup,
    login,
    sendPassword,
};

export default authAPI;
