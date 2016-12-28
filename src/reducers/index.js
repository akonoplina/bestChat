import { combineReducers } from 'redux';

import authReducer from './authReducer';

import chatReducer from './chatReducer';

import socketReducer from './socketReducer';

export default combineReducers({
    authReducer,
    chatReducer,
    socketReducer
});
