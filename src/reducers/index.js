import { combineReducers } from 'redux';

import signIn from './signIn';
import signUp from './signUp';
import password from './password';
import okButton from './okButton';

export default combineReducers({
    signIn,
    password,
    signUp,
    okButton
})
