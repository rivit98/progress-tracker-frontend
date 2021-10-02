import axiosInstance from '../utils/axiosConfig';
import { apiUrls } from './apiUrls';

const responseBody = (response) => response.data;

const getCrackmes = async (options = undefined) => {
    return axiosInstance.get(apiUrls.CRACKMES, options).then(responseBody);
};

const getActions = async (options = undefined) => {
    return axiosInstance.get(apiUrls.ACTIONS, options).then(responseBody);
};

const lastUpdated = async (options = undefined) => {
    return axiosInstance.get(apiUrls.LAST_UPDATED, options).then(responseBody);
};

const updateStatus = async (crackmeID, statusData) => {
    return axiosInstance.post(apiUrls.UPDATE_STATUS.replace('%d', crackmeID), statusData).then(responseBody);
};

export const crackmesService = {
    getCrackmes,
    lastUpdated,
    getActions,
    updateStatus
};
