import { take, fork, call, put } from 'redux-saga/effects';
import tv from '../../apis/tv';
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

function* getConfig() {
  try {
    const response = yield call(tv.getConfig);
    if (response) {
      yield put({ type: GET_CONFIG_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (e) {
    yield put({ type: GET_CONFIG_ERROR, e });
  }
}

function* watchGetConfig() {
  while (true) {
    yield take(GET_CONFIG_START);
    yield fork(getConfig);
  }
}

function* getGenre() {
  try {
    const response = yield call(tv.getGenre);
    if (response) {
      yield put({ type: GET_GENRE_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (e) {
    yield put({ type: GET_GENRE_ERROR, e });
  }
}

function* watchGetGenre() {
  while (true) {
    yield take(GET_GENRE_START);
    yield fork(getGenre);
  }
}

function* getDiscover(page, genre) {
  try {
    const response = yield call(tv.getDiscover, page, genre);
    if (response.results) {
      yield put({ type: GET_DISCOVER_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (error) {
    yield put({ type: GET_DISCOVER_ERROR, error });
  }
}

function* watchGetDiscover() {
  while (true) {
    const { page, genre } = yield take(GET_DISCOVER_START);
    yield fork(getDiscover, page, genre);
  }
}

function* getSingleTV(id, season, episode) {
  try {
    const response = yield call(tv.getSingleTV, id, season, episode);
    if (response) {
      yield put({ type: GET_SINGLE_TV_SUCCESS, response });
    }
  } catch (error) {
    yield put({ type: GET_SINGLE_TV_ERROR, error });
  }
}

function* watchGetSingleTV() {
  while (true) {
    const { id, season, episode } = yield take(GET_SINGLE_TV_START);
    yield fork(getSingleTV, id, season, episode);
  }
}

export default function* authSagas() {
  yield fork(watchGetConfig);
  yield fork(watchGetGenre);
  yield fork(watchGetDiscover);
  yield fork(watchGetSingleTV);
}
