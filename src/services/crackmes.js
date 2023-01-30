import axiosInstance from '../utils/axiosConfig';

const API_PREFIX = 'crackmes';
const API_VERSION = 'v1';

const getCrackmes = async (options = undefined) => {
    return axiosInstance.get(`/${API_PREFIX}/${API_VERSION}/`, options);
};

const getActions = async (options = undefined) => {
    return axiosInstance.get(`/${API_PREFIX}/${API_VERSION}/actions/`, options);
};

const lastUpdated = async (options = undefined) => {
    return axiosInstance.get(`/${API_PREFIX}/${API_VERSION}/lastUpdated/`, options);
};

const updateStatus = async (crackmeID, statusData, options = undefined) => {
    return axiosInstance.post(`/${API_PREFIX}/${API_VERSION}/%d/status/`.replace('%d', crackmeID), statusData, options);
};

export const crackmesService = {
    getCrackmes,
    lastUpdated,
    getActions,
    updateStatus,
};
