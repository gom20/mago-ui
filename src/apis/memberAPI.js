import api from './api';

export const memberAPI = {
    createMember: (data) => api.post('members', data),
};
