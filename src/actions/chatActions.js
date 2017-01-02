import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    OK_BUTTON_PRESSED,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_LOGIN,
    USER_LOGOUT
} from '../constants/AuthComponent';

import {
    SOCKETS_MESSAGE_SENDING,
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SEND,
} from '../constants/SocketsComponent';

export function signInAction() {

    return (dispatch) => {
        dispatch({
            type: SIGN_IN_BUTTON_PRESSED
        });
    }
}
export function signUpAction() {

    return (dispatch) => {
        dispatch({
            type: SIGN_UP_BUTTON_PRESSED
        });
    }
}
export function OkButtonAction() {

    return (dispatch) => {
        dispatch({
            type: OK_BUTTON_PRESSED
        });
    }
}
export function userLoggedIn(userLogin, userPass){
    return (dispatch) => {
        dispatch({
            type: USER_LOGGED_IN,
            userLogin,
            userPass
        });
    }
}
export function userLogin(userLogin, userPass){
    return (dispatch) => {
        dispatch({
            type: USER_LOGIN,
            userLogin,
            userPass
        });
    }
}
export function userLogout(userLogin, userPass){
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT,
            userLogin,
            userPass
        });
    }
}


export function userLoggedOut(){
    return (dispatch) => {
        dispatch({
            type: USER_LOGGED_OUT
        });
    }
}
export function changeDataAction(fieldName, validationPassed = false, validateData = null) {

    let type, status = '';
    let validationStateSignIn, validationStateSignUp, validationStatePass = null;
    let buttonDisabled = true;

    if(validationPassed === true){
        status = 'PASSED';
        buttonDisabled = false;
    } else {
        status = 'FAILED';
    }
    switch(fieldName){
        case 'signIn':
            type = 'SIGN_IN_VALIDATION_' + status;
            validationStateSignIn = validateData;
            break;
        case 'signUp':
            type = 'SIGN_UP_VALIDATION_' + status;
            validationStateSignUp = validateData;
            break;
        case 'pass':
            type = 'PASS_VALIDATION_' + status;
            validationStatePass = validateData;
            break;
        default:
            break;

    }

    return (dispatch) => {
        dispatch({
            type: type,
            validationStateSignIn: validationStateSignIn,
            validationStateSignUp: validationStateSignUp,
            validationStatePass: validationStatePass,
            buttonDisabled: buttonDisabled
        });
    }
}
export function socketsMessageSending(sendMessage) {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_MESSAGE_SENDING,
            message_send: sendMessage
        });
    }
}
export function socketsMessageSend(sendMessage) {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_MESSAGE_SEND,
            message_send: sendMessage
        });
    }
}
export function socketsMessageReceiving(receiveMessage) {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_MESSAGE_RECEIVING,
            message_receive: receiveMessage
        });
    }
}

