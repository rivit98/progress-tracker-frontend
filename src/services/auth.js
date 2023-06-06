import axios from 'axios';
import { store } from '../context/store';
import { updateUser } from '../context/userReducer';

const API_VERSION = 'v1';

const getToken = async (loginData) => {
    return axios.post(`/auth/${API_VERSION}/login/`, loginData);
};

const me = async (token) => {
    return axios.get(`/user/${API_VERSION}/me/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const login = async (loginData) => {
    const token = await getToken(loginData);
    const user = await me(token.access);

    return { ...user, ...token };
};

const register = async (registerData) => {
    const user = await axios.post(`/user/${API_VERSION}/register/`, registerData);
    const token = await getToken({ username: user.username, password: registerData.password });

    return { ...user, ...token };
};

const getAccessToken = () => {
    return store.getState().userReducer.access;
};

const getRefreshToken = () => {
    return store.getState().userReducer.refresh;
};

const getNewAccessToken = async (refreshToken) => {
    return axios.post(
        `/auth/${API_VERSION}/refresh/`,
        {
            refresh: refreshToken,
        },
        {
            skipAuthRefresh: true,
        }
    );
};

const refreshUserToken = async (failedRequest) => {
    const refreshToken = getRefreshToken();
    if (refreshToken == null) {
        return Promise.reject(new Error('Your session expired, please login again'));
    }

    try {
        const token = await getNewAccessToken(refreshToken);
        store.dispatch(updateUser(token));
        failedRequest.response.config.headers.Authorization = `Bearer ${token.access}`; // eslint-disable-line no-param-reassign
        return Promise.resolve();
    } catch {
        return Promise.reject(new Error('Your session expired, please login again'));
    }
};

export const authService = {
    login,
    register,
    getAccessToken,
    refreshUserToken,
};
