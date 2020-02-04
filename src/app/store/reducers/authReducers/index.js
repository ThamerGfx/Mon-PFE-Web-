import {combineReducers} from 'redux';
import signOut from './signOut.reducer';
import login from './login.reducer';
import register from './register.reducer';

const authReducers = combineReducers({
    login,
    register,
    signOut
});

export default authReducers;