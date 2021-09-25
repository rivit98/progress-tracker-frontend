import axios from 'axios';
import { authService } from '../services/auth';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000/'
    baseURL: 'https://cpt-rest.ct8.pl/'
});

axiosInstance.interceptors.request.use((request) => {
    const accessToken = request.headers.Authorization;
    if (accessToken != null && accessToken !== '') {
        // if token is already set - skip
        return request;
    }

    const token = authService.getAccessToken();
    if (token != null) {
        // if token is present in sessionStorage - inject
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

const setAxiosInterceptor = () => {
    const interceptor = axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.config && error.response?.status === 401 && !error.config.__isRetry) {
                axiosInstance.interceptors.response.eject(interceptor);

                return new Promise((resolve, reject) => {
                    authService
                        .refreshUserToken(error)
                        .then((response) => resolve(response))
                        .catch((err) => {
                            err.message = 'Your session expired, please login again';
                            reject(err);
                        })
                        .finally(setAxiosInterceptor); //enable interceptor again
                });
            }

            return Promise.reject(error);
        }
    );
};
setAxiosInterceptor();

export default axiosInstance;
