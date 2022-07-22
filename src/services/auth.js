import axiosInstance from '../utils/axiosConfig';
import { apiUrls } from './apiUrls';
import { store } from '../context/store';
import { updateUser } from '../context/userReducer';

const responseBody = (response) => response.data;

const me = async (token) => {
    return axiosInstance
        .get(apiUrls.ME, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(responseBody);
};

const login = async (loginData) => {
    const token = await getToken(loginData.username, loginData.password);
    const user = await me(token.access);

    return { ...user, ...token };
};

const getToken = async (username, password) => {
    return axiosInstance
        .post(apiUrls.TOKEN, {
            username: username,
            password: password
        })
        .then(responseBody);
};

const register = async (registerData) => {
    const user = await axiosInstance.post(apiUrls.REGISTER, registerData).then(responseBody);
    const token = await getToken(user.username, registerData.password);

    return { ...user, ...token };
};

const getAccessToken = () => {
    return store.getState().userReducer.access;
};

const getRefreshToken = () => {
    return store.getState().userReducer.refresh;
};

const getNewAccessToken = async (refreshToken) => {
    return axiosInstance
        .post(apiUrls.REFRESH_TOKEN, {
            refresh: refreshToken
        })
        .then(responseBody);
};

const refreshUserToken = async (err) => {
    const config = err.config;
    const refreshToken = getRefreshToken();
    if (refreshToken == null) {
        return Promise.reject(err);
    }

    const token = await getNewAccessToken(refreshToken);
    store.dispatch(updateUser(token));
    config.headers.Authorization = `Bearer ${token.access}`; // inject new token to old request
    return axiosInstance.request(config);
};

export const authService = {
    login,
    register,
    getAccessToken,
    refreshUserToken
};
