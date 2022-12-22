import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const register = (username, email, password) => {
    // return axios.post(API_URL + 'signup', {
    //     username,
    //     email,
    //     password,
    // });
};

const login = (request) => {
    return api
        .post('auth/login', request)
        .then((response) => {
            // console.warn('response' + response);
            // if (response.data.code == 0) {
            //     AsyncStorage.setItem(
            //         'access_token',
            //         response.data.data.token
            //     );
            // }
            return response;
        })
        .catch((error) => {
            alert(error);
        });
};

const authAPI = {
    register,
    login,
    // logout,
};

export default authAPI;
