import axios from 'axios';

const API_PREFIX = 'heroes_maps';
const API_VERSION = 'v1';

const getMaps = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/maps/`, options);
};

const getMapsWithActions = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/maps-actions/`, options);
};

const createMap = async (map_data, options = undefined) => {
    return axios.post(`/${API_PREFIX}/${API_VERSION}/maps/`, map_data, options);
};

const updateMap = async (map_id, map_data, options = undefined) => {
    return axios.put(`/${API_PREFIX}/${API_VERSION}/maps/${map_id}/`, map_data, options);
};

const deleteMap = async (map_id, options = undefined) => {
    return axios.delete(`/${API_PREFIX}/${API_VERSION}/maps/${map_id}/`, options);
};

const getMap = async (map_id, options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/maps/${map_id}/`, options);
};

const getActions = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/actions/`, options);
};

const updateStatus = async (map_id, statusData, options = undefined) => {
    return axios.post(`/${API_PREFIX}/${API_VERSION}/maps/${map_id}/status/`, statusData, options);
};

export const heroesMapsService = {
    getMaps,
    getMapsWithActions,
    createMap,
    updateMap,
    deleteMap,
    getMap,
    getActions,
    updateStatus,
};
