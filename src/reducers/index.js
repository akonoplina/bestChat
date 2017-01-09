import { combineReducers } from 'redux';

import authReducer from './authReducer';

import socketReducer from './socketReducer';

import userReducer from './userReducer';

export default combineReducers({
  authReducer,
  socketReducer,
  userReducer,
});
