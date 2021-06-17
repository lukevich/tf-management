import axios from 'axios';
import { AUTH_LOCAL_STORAGE_NAME } from 'settings/constants/auth';

const headers = localStorage.getItem(AUTH_LOCAL_STORAGE_NAME)
    ? { headers: { Authorization: localStorage.getItem(AUTH_LOCAL_STORAGE_NAME) } }
    : {};

export const apiServer = axios.create({
    ...headers,
});

apiServer.interceptors.response.use((response) => {
    if (response.request.responseURL && response.request.responseURL.includes('/login')) {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_NAME);
        window.location.href = response.request.responseURL;
        return;
    }
    return response;
});
