export const AUTH_LOCAL_STORAGE_NAME = 'terraform-auth-token';

export const isAuth = !!localStorage.getItem(AUTH_LOCAL_STORAGE_NAME);
