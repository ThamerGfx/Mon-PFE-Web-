import {combineReducers} from 'redux';
import user from './userReducer';
import login from './loginReducer';
import register from './registerReducer';

const authReducers = combineReducers({
    user,
    login,
    register
});

export default authReducers;