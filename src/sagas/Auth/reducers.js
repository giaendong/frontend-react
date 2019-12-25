import { Map } from 'immutable';
import Cookies from 'js-cookie';

import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,

  LOGOUT_START,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,

  GET_ME_START,
  GET_ME_ERROR,
  GET_ME_SUCCESS,

  UPDATE_USER_FAVORITES_START,
  UPDATE_USER_FAVORITES_ERROR,
  UPDATE_USER_FAVORITES_SUCCESS
} from './actions';

const initialState = Map({
  authLoading: false,
  authError: {},
  isAuthenticated: false,

  meLoad: false,
  meData: {},
  meError: false,

  logoutStart: false,
  logoutError: false,

  updateUserFavoritesLoad: false,
  updateUserFavoritesData: {},
  updateUserFavoritesError: false
});

const actionsMap = {
  // Async action
  [LOGIN_START]: (state) => {
    return state.merge(Map({
      authLoading: true,
      authError: {},
      isAuthenticated: false
    }));
  },
  [LOGIN_ERROR]: (state, action) => {
    return state.merge(Map({
      authLoading: false,
      authError: action.error,
      isAuthenticated: false
    }));
  },
  [LOGIN_SUCCESS]: (state) => {
    return state.merge(Map({
      authLoading: false,
      authError: {},
      isAuthenticated: true
    }));
  },

  [LOGOUT_START]: (state) => {
    return state.merge(Map({
      logoutStart: true,
      logoutError: false
    }));
  },
  [LOGOUT_ERROR]: (state) => {
    return state.merge(Map({
      logoutStart: true,
      logoutError: true
    }));
  },
  [LOGOUT_SUCCESS]: (state) => {
    Cookies.set('auth_key', '');
    return state.merge(Map({
      authLoading: false,
      authError: {},
      meData: {},
      isAuthenticated: false,
      logoutStart: false,
      logoutError: false
    }));
  },

  [GET_ME_START]: (state) => {
    return state.merge(Map({
      meData: {},
      meLoad: true,
      meError: false
    }));
  },
  [GET_ME_ERROR]: (state) => {
    return state.merge(Map({
      meData: {},
      meLoad: false,
      meError: true,
      isAuthenticated: false
    }));
  },
  [GET_ME_SUCCESS]: (state, action) => {
    return state.merge(Map({
      meData: action.response.user,
      meLoad: false,
      meError: false,
      isAuthenticated: true
    }));
  },

  [UPDATE_USER_FAVORITES_START]: (state) => {
    return state.merge(Map({
      updateUserFavoritesData: {},
      updateUserFavoritesLoad: true,
      updateUserFavoritesError: false
    }));
  },
  [UPDATE_USER_FAVORITES_ERROR]: (state) => {
    return state.merge(Map({
      updateUserFavoritesData: {},
      updateUserFavoritesLoad: false,
      updateUserFavoritesError: true
    }));
  },
  [UPDATE_USER_FAVORITES_SUCCESS]: (state, action) => {
    return state.merge(Map({
      updateUserFavoritesData: action.response,
      updateUserFavoritesLoad: false,
      updateUserFavoritesError: false
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
