const REGISTER = `/user/v1/register/`;
const ME = `/user/v1/me/`;

const TOKEN = `/auth/v1/login/`;
const REFRESH_TOKEN = `/auth/v1/refresh/`;

const CRACKMES = `/crackmes/v1/`;
const LAST_UPDATED = `/crackmes/v1/lastUpdated/`;
const ACTIONS = `/crackmes/v1/actions/`;
const UPDATE_STATUS = `/crackmes/v1/%d/status/`;

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
