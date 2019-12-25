import { Map } from 'immutable';

import {
  GET_CONFIG_START,
  GET_CONFIG_ERROR,
  GET_CONFIG_SUCCESS,

  GET_GENRE_START,
  GET_GENRE_ERROR,
  GET_GENRE_SUCCESS,

  GET_DISCOVER_START,
  GET_DISCOVER_ERROR,
  GET_DISCOVER_SUCCESS,

  GET_SINGLE_TV_START,
  GET_SINGLE_TV_ERROR,
  GET_SINGLE_TV_SUCCESS
} from './actions';

const initialState = Map({

  configLoad: false,
  configData: {},
  configError: false,

  genreLoad: false,
  genreData: {},
  genreError: false,

  discoverLoad: false,
  discoverData: {},
  discoverError: false,

  singleTVLoad: false,
  singleTVData: {},
  singleTVError: false,
});

const actionsMap = {
  [GET_CONFIG_START]: (state) => {
    return state.merge(Map({
      configData: {},
      configLoad: true,
      configError: false
    }));
  },
  [GET_CONFIG_ERROR]: (state) => {
    return state.merge(Map({
      configData: {},
      configLoad: false,
      configError: true,
    }));
  },
  [GET_CONFIG_SUCCESS]: (state, action) => {
    return state.merge(Map({
      configData: action.response,
      configLoad: false,
      configError: false,
    }));
  },

  [GET_GENRE_START]: (state) => {
    return state.merge(Map({
      genreData: {},
      genreLoad: true,
      genreError: false
    }));
  },
  [GET_GENRE_ERROR]: (state) => {
    return state.merge(Map({
      genreData: {},
      genreLoad: false,
      genreError: true,
    }));
  },
  [GET_GENRE_SUCCESS]: (state, action) => {
    return state.merge(Map({
      genreData: action.response,
      genreLoad: false,
      genreError: false,
    }));
  },

  [GET_DISCOVER_START]: (state) => {
    return state.merge(Map({
      discoverData: {},
      discoverLoad: true,
      discoverError: false
    }));
  },
  [GET_DISCOVER_ERROR]: (state) => {
    return state.merge(Map({
      discoverData: {},
      discoverLoad: false,
      discoverError: true,
    }));
  },
  [GET_DISCOVER_SUCCESS]: (state, action) => {
    return state.merge(Map({
      discoverData: action.response,
      discoverLoad: false,
      discoverError: false,
    }));
  },
  [GET_SINGLE_TV_START]: (state) => {
    return state.merge(Map({
      singleTVData: {},
      singleTVLoad: true,
      singleTVError: false
    }));
  },
  [GET_SINGLE_TV_ERROR]: (state) => {
    return state.merge(Map({
      singleTVData: {},
      singleTVLoad: false,
      singleTVError: true,
    }));
  },
  [GET_SINGLE_TV_SUCCESS]: (state, action) => {
    return state.merge(Map({
      singleTVData: action.response,
      singleTVLoad: false,
      singleTVError: false,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}