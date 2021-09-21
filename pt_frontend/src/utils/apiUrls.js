const API_VERSION = '/api/v1';

const REGISTER = `${API_VERSION}/auth/register/`;
const ME = `${API_VERSION}/users/me/`;
const TOKEN = `${API_VERSION}/auth/login/`;
const REFRESH_TOKEN = `${API_VERSION}/auth/refresh/`;

export const apiUrls = {
    REGISTER,
    ME,
    TOKEN,
    REFRESH_TOKEN
};
