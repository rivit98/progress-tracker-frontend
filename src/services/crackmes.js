import axios from 'axios';

const API_PREFIX = 'crackmes';
const API_VERSION = 'v1';

const getCrackmes = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/`, options);
};

const getActions = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/actions/`, options);
};

const lastUpdated = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/lastUpdated/`, options);
};

const updateStatus = async (crackmeID, statusData, options = undefined) => {
    return axios.post(`/${API_PREFIX}/${API_VERSION}/${crackmeID}/status/`, statusData, options);
};

export const crackmesService = {
    getCrackmes,
    lastUpdated,
    getActions,
    updateStatus,
};
