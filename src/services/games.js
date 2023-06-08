import axios from 'axios';

const API_PREFIX = 'games';
const API_VERSION = 'v1';

const getGames = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/games/`, options);
};

const createGame = async (game_data, options = undefined) => {
    return axios.post(`/${API_PREFIX}/${API_VERSION}/games/`, game_data, options);
};

const updateGame = async (game_id, game_data, options = undefined) => {
    return axios.put(`/${API_PREFIX}/${API_VERSION}/games/${game_id}/`, game_data, options);
};

const deleteGame = async (game_id, options = undefined) => {
    return axios.delete(`/${API_PREFIX}/${API_VERSION}/games/${game_id}/`, options);
};

const getGame = async (game_id, options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/games/${game_id}/`, options);
};

const getActions = async (options = undefined) => {
    return axios.get(`/${API_PREFIX}/${API_VERSION}/actions/`, options);
};

const updateStatus = async (game_id, statusData, options = undefined) => {
    return axios.post(`/${API_PREFIX}/${API_VERSION}/games/${game_id}/status/`, statusData, options);
};

export const gamesService = {
    getGames,
    createGame,
    updateGame,
    deleteGame,
    getGame,
    getActions,
    updateStatus,
};
