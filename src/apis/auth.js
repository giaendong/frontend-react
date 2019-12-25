import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';
import Cookies from 'js-cookie';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
let REACT_APP_API_ROOT = process.env.REACT_APP_DEV_API_ROOT;
if (IS_PRODUCTION) {
  REACT_APP_API_ROOT = process.env.REACT_APP_PROD_API_ROOT;
}
const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;

promisePolyfill.polyfill();

function login(username, password) {
  return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function getMe() {
  return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ Cookies.get('auth_key') }`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {
      'message': 'Unauthorized',
    };
  });
}

function updateUserFavorites(favorite, command) {
    return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/users/favorites`, {
      method: 'PUT',
      body: JSON.stringify({
        favorite,
        command,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ Cookies.get('auth_key') }`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return {
        'message': 'Unauthorized',
      };
    });
  }

function logout() {
    return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/users/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    });
  }

export default {
  login,
  getMe,
  updateUserFavorites,
  logout
};
