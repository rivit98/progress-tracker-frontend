import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { authService } from '../services/auth';

axios.defaults.baseURL = 'https://ptb.rivit.dev/';
// axios.defaults.baseURL = 'http://localhost:8000/';

axios.interceptors.response.use((response) => response.data);

axios.interceptors.request.use((request) => {
    const token = authService.getAccessToken();
    if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

createAuthRefreshInterceptor(axios, (failedRequest) => authService.refreshUserToken(failedRequest));
