import axiosInstance from '../utils/axiosConfig';
import { apiUrls } from './apiUrls';
import { store } from '../context/store';
import { updateUser } from '../context/userReducer';

const me = async (token) => {
    return axiosInstance
        .get(apiUrls.ME, {
            headers: { Authorization: `Bearer ${token}` }
        })
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
};

const register = async (registerData) => {
    const user = await axiosInstance.post(apiUrls.REGISTER, registerData)
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
    refreshUserToken
};
