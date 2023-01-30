import axiosInstance from '../utils/axiosConfig';
import { store } from '../context/store';
import { updateUser } from '../context/userReducer';

const API_VERSION = 'v1';

const me = async (token) => {
    return axiosInstance.get(`/user/${API_VERSION}/me/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const login = async (loginData) => {
    const token = await getToken(loginData.username, loginData.password);
    const user = await me(token.access);

    return { ...user, ...token };
};

const getToken = async (username, password) => {
    return axiosInstance.post(`/auth/${API_VERSION}/login/`, {
        username: username,
        password: password,
    });
};

const register = async (registerData) => {
    const user = await axiosInstance.post(`/user/${API_VERSION}/register/`, registerData);
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
    return axiosInstance.post(`/auth/${API_VERSION}/refresh/`, {
        refresh: refreshToken,
    });
};

const refreshUserToken = async (failedRequest) => {
    const refreshToken = getRefreshToken();
    if (refreshToken == null) {
        return Promise.reject('Your session expired, please login again');
    }

    const token = await getNewAccessToken(refreshToken);
    store.dispatch(updateUser(token));
    failedRequest.response.config.headers['Authorization'] = `Bearer ${token.access}`;
    return Promise.resolve();
};

export const authService = {
    login,
    register,
    getAccessToken,
    refreshUserToken,
};
