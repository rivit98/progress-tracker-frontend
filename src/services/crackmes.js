import axiosInstance from '../utils/axiosConfig';
import { apiUrls } from './apiUrls';


const getCrackmes = async (options = undefined) => {
    return axiosInstance.get(apiUrls.CRACKMES, options)
};

const getActions = async (options = undefined) => {
    return axiosInstance.get(apiUrls.ACTIONS, options)
};

const lastUpdated = async (options = undefined) => {
    return axiosInstance.get(apiUrls.LAST_UPDATED, options)
};

const updateStatus = async (crackmeID, statusData) => {
    return axiosInstance.post(apiUrls.UPDATE_STATUS.replace('%d', crackmeID), statusData)
};

export const crackmesService = {
    getCrackmes,
    lastUpdated,
    getActions,
    updateStatus
};
