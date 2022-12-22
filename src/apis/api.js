import axios from 'axios';
import getEnvVars from '../environment';

const ENV = getEnvVars();
const BASE_URL = ENV.apiDomain + '/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // access_token: cookies.get('access_token'),
    },
    timeout: 5000,
    validateStatus: (status) => {
        // 200 미만의 응답만 성공으로 본다. 즉 200, 300번대 응답은 에러를 반환한다.
        return status == 200;
    },
});

const mockdelay = async (ms) =>
    new Promise((resolve) => setTimeout(() => resolve('success'), ms));

api.interceptors.request.use(
    async function (config) {
        await mockdelay(2000);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error.response && error.response.status) {
            console.error(error.response.status);
            // alert('error!');
            // switch (error.response.status) {
            //     // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
            //     case 401:
            //         store.commit('auth/logout');
            //         router.push('/login').catch(() => {});
            //         // 이행되지 않는 Promise를 반환하여 Promise Chaining 끊어주기
            //         return new Promise(() => {});
            //     default:
            //         return Promise.reject(error);
            // }
        }
        // Promise Chaning 끊기
        // return new Promise(() => {});
        return Promise.reject(error);
    }
);

export default api;
