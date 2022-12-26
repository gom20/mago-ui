import axios from 'axios';
import { useDispatch } from 'react-redux';
import getEnvVars from '../environment';

const BASE_URL = getEnvVars().apiDomain + '/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // access_token: cookies.get('access_token'),
    },
    timeout: 5000,
    validateStatus: (status) => {
        return status == 200;
    },
});

export default api;
