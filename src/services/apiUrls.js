const API_VERSION = 'v1'


const REGISTER = `/user/${API_VERSION}/register/`;
const ME = `/user/${API_VERSION}/me/`;

const TOKEN = `/auth/${API_VERSION}/login/`;
const REFRESH_TOKEN = `/auth/${API_VERSION}/refresh/`;

const CRACKMES = `/crackmes/${API_VERSION}/`;
const LAST_UPDATED = `/crackmes/${API_VERSION}/lastUpdated/`;
const ACTIONS = `/crackmes/${API_VERSION}/actions/`;
const UPDATE_STATUS = `/crackmes/${API_VERSION}/%d/status/`;

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
