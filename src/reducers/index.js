import {combineReducers} from 'redux';
import auth from '../sagas/Auth/reducers';
import tv from '../sagas/TV/reducers';

export default combineReducers({
    auth,
    tv
})