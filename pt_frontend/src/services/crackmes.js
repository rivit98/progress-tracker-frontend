import axiosInstance from '../utils/axiosConfig';
import { apiUrls } from './apiUrls';

const responseBody = (response) => response.data;

const getCrackmes = async () => {
    return axiosInstance.get(apiUrls.CRACKMES).then(responseBody);
};


export const crackmesService = {
    getCrackmes
};