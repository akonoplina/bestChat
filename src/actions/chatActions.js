import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    OK_BUTTON_PRESSED,
    SEND_MESSAGE,
    VALIDATE_DATA
} from '../constants/AuthComponent';

import {
    SOCKETS_CONNECTING,
    SOCKETS_DISCONNECTING,
    SOCKETS_MESSAGE_SENDING,
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SEND,
    SOCKETS_CONNECT,
    SOCKETS_DISCONNECT
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
export function validateAction() {

    return (dispatch) => {
        dispatch({
            type: VALIDATE_DATA
        });
    }
}
export function changeDataAction(fieldName, dataEntered = false) {

    let type, status = '';

    if(dataEntered === true){
        status = 'ENTERED';
    } else {
        status = 'DELETED';
    }
    switch(fieldName){
        case 'signInEmpty':
            type = 'SIGN_IN_' + status;
            break;
        case 'signUpEmpty':
            type = 'SIGN_UP_' + status;
            break;
        case 'passEmpty':
            type = 'PASS_' + status;
            break;
        default:
            break;

    }

    return (dispatch) => {
        dispatch({
            type: type
        });
    }
}

export function socketsConnecting() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_CONNECTING
        });
    }
}
export function socketsConnect() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_CONNECT
        });
    }
}
export function socketsDisconnecting() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_DISCONNECTING
        });
    }
}
export function socketsDisconnect() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_DISCONNECT
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

