import {
    SOCKETS_CONNECTING,
    SOCKETS_DISCONNECTING,
    SOCKETS_MESSAGE_SENDING,
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SEND,
    SOCKETS_CONNECT,
    SOCKETS_DISCONNECT
} from '../constants/SocketsComponent';

export function socketsConnecting() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_CONNECTING
        });
    };
}
export function socketsConnect() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_CONNECT
        });
    };
}
export function socketsDisconnecting() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_DISCONNECTING
        });
    };
}
export function socketsDisconnect() {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_DISCONNECT
        });
    };
}
export function socketsMessageSending(sendMessage, userName, userAvatar) {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_MESSAGE_SENDING,
            messageSend: sendMessage,
            userName,
            userAvatar
        });
    };
}
export function socketsMessageSend(sendMessage, userName, userAvatar) {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_MESSAGE_SEND,
            messageSend: sendMessage,
            userName,
            userAvatar
        });
    };
}
export function socketsMessageReceiving(receiveMessage, userName, userAvatar) {
    return (dispatch) => {
        dispatch({
            type: SOCKETS_MESSAGE_RECEIVING,
            messageReceive: receiveMessage,
            userName,
            userAvatar
        });
    };
}
