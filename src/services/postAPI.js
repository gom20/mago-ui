import api from './api';

const createPost = (request) => {
    return api.post('posts', request).then((response) => {
        return response;
    });
};

const getPosts = (request) => {
    return api.get('posts', request).then((response) => {
        return response;
    });
};

const postAPI = {
    createPost,
    getPosts,
};

export default postAPI;
