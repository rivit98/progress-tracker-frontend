import axiosInstance from '../utils/axiosConfig';
import { apiUrls } from './apiUrls';

const responseBody = (response) => response.data;

const getCrackmes = async (options = undefined) => {
    return axiosInstance.get(apiUrls.CRACKMES, options).then(responseBody);
};


export const crackmesService = {
    getCrackmes
};