import api from './api';

const getStamps = (request) => {
    return api.get('stamps', request).then((response) => {
        return response;
    });
};

const updateStamp = (request) => {
    return api.put('stamps', request).then((response) => {
        return response;
    });
};

const stampAPI = {
    getStamps: getStamps,
    updateStamp: updateStamp,
};

export default stampAPI;
