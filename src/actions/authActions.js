import { browserHistory } from 'react-router';
import {
    AUTH_SEND_DATA,
    USER_EXIT,
    DISPLAY_ERROR_MESSAGE,
    USER_LOGGED_IN,
    CLEAR_ERROR_MESSAGE
} from '../constants/AuthComponent';


export function displayErrorMessage(errorMessage) {
    return (dispatch) => {
        dispatch({
            type: DISPLAY_ERROR_MESSAGE,
            errorMessage
        });
    };
}
export function clearErrorMessage() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ERROR_MESSAGE,
            errorMessage: ''
        });
    };
}
export function authSendData(userLogin, userPass, authType, userName = null, userAge = null, userAvatar = null, userAboutMe = null) {
    return (dispatch) => {
        dispatch({
            type: AUTH_SEND_DATA,
            userLogin,
            userPass,
            authType,
            userName,
            userAge,
            userAvatar,
            userAboutMe
        });
    };
}
export function userLoggedIn(userObj) {
    return (dispatch) => {
        /* global localStorage*/
        localStorage.setItem('userObj', JSON.stringify(userObj));
        dispatch({
            type: USER_LOGGED_IN
        });
        browserHistory.push('/chat');
    };
}
export function userExit() {
    return (dispatch) => {
        dispatch({
            type: USER_EXIT
        });
    };
}
