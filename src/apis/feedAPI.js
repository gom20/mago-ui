import api from './api';

API_URL = 'feeds/';

export const feedAPI = {
    createFeed: (data) => api.post(API_URL, data),
    getFeedDetail: (feedId) =>
        api.get(API_URL, {
            params: {
                feedId: feedId,
            },
        }),
    getFeedList: () => api.get(API_URL),
};
