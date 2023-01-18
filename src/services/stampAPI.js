import api from './api';

const getStamps = (params) => {
    return api.get('stamps', { params: params }).then((response) => {
        return response;
    });
};

const updateStamp = (request) => {
    return api.put('stamps', request).then((response) => {
        return response;
    });
};

const stampAPI = {
    getStamps,
    updateStamp,
};

export default stampAPI;
