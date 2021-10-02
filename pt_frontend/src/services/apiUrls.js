const API_VERSION = 'v1';

const REGISTER = `/crackmes/${API_VERSION}/auth/register/`;
const ME = `/crackmes/${API_VERSION}/users/me/`;
const TOKEN = `/crackmes/${API_VERSION}/auth/login/`;
const REFRESH_TOKEN = `/crackmes/${API_VERSION}/auth/refresh/`;

const CRACKMES = `/crackmes/${API_VERSION}/tasks/`;
const LAST_UPDATED = `/crackmes/${API_VERSION}/tasks/lastUpdated/`;
const ACTIONS = `/crackmes/${API_VERSION}/tasks/actions/`;
const UPDATE_STATUS = `/crackmes/${API_VERSION}/tasks/%d/status/`;

export const apiUrls = {
    REGISTER,
    ME,
    TOKEN,
    REFRESH_TOKEN,

    CRACKMES,
    LAST_UPDATED,
    ACTIONS,
    UPDATE_STATUS
};
