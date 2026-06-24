import Cookies from 'js-cookie';

const TOKEN_KEY = 'ultnexus_auth_token';

export const setAuthCookie = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
};

export const getAuthCookie = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthCookie = () => {
  Cookies.remove(TOKEN_KEY);
};
