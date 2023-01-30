import axiosInstance from '../utils/axiosConfig';

const API_PREFIX = 'heroes_maps';
const API_VERSION = 'v1';

const getMaps = async (options = undefined) => {
    return axiosInstance.get(`/${API_PREFIX}/${API_VERSION}/maps/`, options);
};

const createMap = async (map_data, options = undefined) => {
    return axiosInstance.post(`/${API_PREFIX}/${API_VERSION}/maps/`, map_data, options);
};

const updateMap = async (map_id, map_data, options = undefined) => {
    return axiosInstance.put(`/${API_PREFIX}/${API_VERSION}/maps/%d/`.replace('%d', map_id), map_data, options);
};

const deleteMap = async (map_id, options = undefined) => {
    return axiosInstance.delete(`/${API_PREFIX}/${API_VERSION}/maps/%d/`.replace('%d', map_id), options);
};

const getMap = async (map_id, options = undefined) => {
    return axiosInstance.get(`/${API_PREFIX}/${API_VERSION}/maps/%d/`.replace('%d', map_id), options);
};

const getActions = async (options = undefined) => {
    return axiosInstance.get(`/${API_PREFIX}/${API_VERSION}/actions/`, options);
};

const updateStatus = async (map_id, statusData, options = undefined) => {
    return axiosInstance.post(
        `/${API_PREFIX}/${API_VERSION}/maps/%d/status/`.replace('%d', map_id),
        statusData,
        options
    );
};

export const heroesMapsService = {
    getMaps,
    createMap,
    updateMap,
    deleteMap,
    getMap,
    getActions,
    updateStatus,
};
