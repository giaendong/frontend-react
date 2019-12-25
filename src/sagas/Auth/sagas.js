import { take, fork, call, put, cancel } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import auth from '../../apis/auth';
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

function* login(username, password) {
  try {
    const response = yield call(auth.login, username, password);
    if (response.user.token) {
      yield put({ type: LOGIN_SUCCESS, response });
      Cookies.set('auth_key', response.user.token);
    } else {
      throw response; // throw the err response
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  }
}

function* watchLogin() {
  while (true) {
    const { username, password } = yield take(LOGIN_START);
    const task = yield fork(login, username, password);
    const action = yield take([LOGOUT_START, LOGIN_ERROR]);
    if (action.type === LOGOUT_START) {
      yield cancel(task);
    }
  }
}

function* getMe() {
  try {
    const response = yield call(auth.getMe);
    if (response.user.username) {
      yield put({ type: GET_ME_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (e) {
    yield put({ type: GET_ME_ERROR, e });
  }
}

function* watchGetMe() {
  while (true) {
    yield take(GET_ME_START);
    yield fork(getMe);
  }
}

function* updateUserFavorites(favorite, command) {
  try {
    const response = yield call(auth.updateUserFavorites, favorite, command);
    if (response.ok) {
      yield put({ type: UPDATE_USER_FAVORITES_SUCCESS, response });
    } else {
      throw response; // throw the err response
    }
  } catch (e) {
    yield put({ type: UPDATE_USER_FAVORITES_ERROR, e });
  }
}

function* watchUpdateUserFavorites() {
  while (true) {
    const { favorite, command } = yield take(UPDATE_USER_FAVORITES_START);
    yield fork(updateUserFavorites, favorite, command);
  }
}

function* logout() {
    try {
      const response = yield call(auth.logout);
      if (response.message === 'Logged Out') {
        yield put({ type: LOGOUT_SUCCESS });
      } else {
        throw response; // throw the err response
      }
    } catch (error) {
      yield put({ type: LOGOUT_ERROR });
    }
  }
  
  function* watchLogout() {
    while (true) {
      yield take(LOGOUT_START);
      yield fork(logout);
    }
  }

export default function* authSagas() {
  yield fork(watchLogin);
  yield fork(watchGetMe);
  yield fork(watchUpdateUserFavorites);
  yield fork(watchLogout);
}
