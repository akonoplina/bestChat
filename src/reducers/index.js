import { combineReducers } from 'redux';

import authReducer from './authReducer';

import chatReducer from './chatReducer';

export default combineReducers({
    authReducer,
    chatReducer
});
