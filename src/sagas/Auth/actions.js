export const LOGIN_START = 'LOGIN_START';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const GET_ME_START = 'GET_ME_START';
export const GET_ME_ERROR = 'GET_ME_ERROR';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';

export const UPDATE_USER_FAVORITES_START = 'UPDATE_USER_FAVORITES_START';
export const UPDATE_USER_FAVORITES_ERROR = 'UPDATE_USER_FAVORITES_ERROR';
export const UPDATE_USER_FAVORITES_SUCCESS = 'UPDATE_USER_FAVORITES_SUCCESS';

export function login(username, password) {
  return {
    type: LOGIN_START,
    username,
    password
  };
}

export function logout() {
  return {
    type: LOGOUT_START
  };
}

export function getMe() {
  return {
    type: GET_ME_START
  };
}

export function updateUserFavorites(favorite, command) {
  return {
    type: UPDATE_USER_FAVORITES_START,
    favorite,
    command
  };
}