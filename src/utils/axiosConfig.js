import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { authService } from '../services/auth';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/'
    baseURL: 'https://ptb.rivit.dev/'
});

axiosInstance.interceptors.response.use(response => response.data);

axiosInstance.interceptors.request.use((request) => {
    const token = authService.getAccessToken();
    if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

createAuthRefreshInterceptor(axiosInstance, (failedRequest) => authService.refreshUserToken(failedRequest));

export default axiosInstance;
