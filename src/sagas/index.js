import { all } from 'redux-saga/effects';

import auth from './Auth/sagas';
import tv from './TV/sagas';

// combine all sagas
export default function* rootSaga() {
    yield all([
        auth(),
        tv(),
    ]);
}