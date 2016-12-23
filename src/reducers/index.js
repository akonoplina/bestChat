import { combineReducers } from 'redux';

import signIn from './signIn';
import signUp from './signUp';
import password from './password';
import okButton from './okButton';
import messageList from './messageList';
import messageForm from './messageForm';

export default combineReducers({
    signIn,
    password,
    signUp,
    okButton,
    messageList,
    messageForm
});
