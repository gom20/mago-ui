import api from './api';

const signup = (request) => {
    return api.post('members', request).then((response) => {
        return response;
    });
};

const withdraw = (request) => {
    return api.delete('members', { data: request }).then((response) => {
        return response;
    });
};

const updatePassword = (request) => {
    return api.put('members/password', request).then((response) => {
        return response;
    });
};

const sendTempPassword = (request) => {
    return api.post('members/sendTempPassword', request).then((response) => {
        return response;
    });
};

const memberAPI = {
    signup,
    withdraw,
    updatePassword,
    sendTempPassword,
};

export default memberAPI;
