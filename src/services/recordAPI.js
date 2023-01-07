import api from './api';

const createRecord = (request) => {
    return api.post('records', request).then((response) => {
        return response;
    });
};

const getRecords = (request) => {
    return api.get('records', request).then((response) => {
        return response;
    });
};

const recordAPI = {
    createRecord: createRecord,
    getRecords: getRecords,
};

export default recordAPI;
