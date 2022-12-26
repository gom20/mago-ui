import { AsyncAlert } from '../utils/AsyncAlert';
import api from './api';

const signup = (request) => {
    return api
        .post('auth/signup', request)
        .then(async (response) => {
            await AsyncAlert('Alert', '가입 되었습니다.');
            return response.data;
        })
        .catch((error) => {});
};

const login = (request) => {
    return api
        .post('auth/login', request)
        .then((response) => {
            if (response.code == 0) {
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
