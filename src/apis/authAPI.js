import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const signup = (request) => {
    return api
        .post('auth/signup', request)
        .then((response) => {
            if (response.data.code == 0) {
                alert('가입 완료 되었습니다.');
                // AsyncStorage.setItem('access_token', response.data.token);
            }
            return response.data;
        })
        .catch((error) => {});
};

const login = (request) => {
    return api
        .post('auth/login', request)
        .then((response) => {
            if (response.data.code == 0) {
                // AsyncStorage.setItem('access_token', response.data.token);
            }
            return response.data;
        })
        .catch((error) => {});
};
[];
const authAPI = {
    signup,
    login,
};

export default authAPI;
