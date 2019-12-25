import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
let REACT_APP_API_ROOT = process.env.REACT_APP_DEV_API_ROOT;
if (IS_PRODUCTION) {
  REACT_APP_API_ROOT = process.env.REACT_APP_PROD_API_ROOT;
}
const REACT_APP_API_VERSION = process.env.REACT_APP_API_VERSION;

promisePolyfill.polyfill();

function getConfig() {
    return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/tv/configuration`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    });
  }

function getGenre() {
    return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/tv/genre`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    });
  }

function getDiscover(page, genre) {
  return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/tv/discover${ page || genre ?
    '?' : '' }${ page ? 'page=' + page : '' }${ page && genre ? '&' : ''}${ genre ? 'genre=' + genre : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  });
}

function getSingleTV(id, season, episode) {
    return fetch(`${ REACT_APP_API_ROOT }/api/${ REACT_APP_API_VERSION }/tv/${ id }${ season || episode ?
      '?' : '' }${ season ? 'season=' + season : '' }${ season && episode ? '&' : ''}${ episode ? 'episode=' + episode : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    });
  }

export default {
  getConfig,
  getGenre,
  getDiscover,
  getSingleTV
};
