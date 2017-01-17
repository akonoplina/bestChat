import * as authActions from '../actions/authActions';
import * as socketActions from '../actions/socketActions';

export default function webSocketMiddleware() {
    let webSocket = null;

    const onClose = store => () => {
        store.dispatch(socketActions.socketsDisconnect());
    };
    const waitForConnection = (callback, interval) => {
        if (webSocket.readyState === 1) {
            callback();
        } else {
            setTimeout(() => {
                waitForConnection(callback, interval);
            }, interval);
        }
    };
    const onMessage = (ws, store) => (evt) => {
        let msg = evt.data;
        msg = JSON.parse(msg);

        const error = msg.errorText;
        const connectionType = msg.connectionType; // auth or message
        const authType = msg.authType; // signIn or signOut

        const jwt = msg.jwt; // JWT obj needs to be decoded
        let userName = '';
        let userAvatar = '';
        let userMessage = '';

        switch (connectionType) {
            case 'auth':
                if (authType === 'signIn') {
                    if (Object.keys(jwt).length > 0) {
                        localStorage.setItem('jwt', jwt);
                    } else if (error.length > 0) {
                        store.dispatch(authActions.displayErrorMessage(error));
                    } else {
                        store.dispatch(authActions.displayErrorMessage('server-side error appeared'));
                    }
                } else if (authType === 'signUp') {
                    if (Object.keys(jwt).length > 0) {
                        localStorage.setItem('jwt', jwt);
                    } else if (typeof error !== 'undefined' && error.length > 0) {
                        store.dispatch(authActions.displayErrorMessage(error));
                    } else {
                        store.dispatch(authActions.displayErrorMessage('server-side error appeared'));
                    }
                }
                break;
            case 'message':
                userMessage = msg.userMessage;
                userName = msg.userName;
                userAvatar = msg.userAvatar;
                if (Object.keys(userMessage).length > 0) {
                    store.dispatch(socketActions.socketsMessageReceiving(userMessage, userName, userAvatar));
                } else if (typeof error !== 'undefined' && error.length > 0) {
                    store.dispatch(authActions.displayErrorMessage(error));
                } else {
                    store.dispatch(authActions.displayErrorMessage('server-side error appeared'));
                }
                break;
            default:
                break;
        }
    };
    return store => next => (action) => {
        switch (action.type) {
            case 'SOCKETS_CONNECT':
                if (webSocket !== null) {
                    /* global localStorage*/
                    localStorage.setItem('connected', false);
                    webSocket.close();
                }
                /* global WebSocket*/
                webSocket = new WebSocket('ws://127.0.0.1:5000');
                webSocket.onmessage = onMessage(webSocket, store);
                webSocket.onclose = onClose(store);
                localStorage.setItem('connected', true);
                break;
            case 'SOCKETS_DISCONNECT':
                if (webSocket !== null) {
                    localStorage.setItem('connected', false);
                    webSocket.close();
                }
                webSocket = null;
                break;
            case 'SOCKETS_MESSAGE_SEND':
                webSocket.send(JSON.stringify({
                    userMessage: action.messageSend,
                    userName: action.userName,
                    userAvatar: action.userAvatar }));
                store.dispatch(socketActions.socketsMessageSending(action.messageSend, action.userName,
                action.userAvatar));
                break;
            case 'AUTH_SEND_DATA':
                waitForConnection(() => {
                    const messageText = {
                        userLogin: action.userLogin,
                        userPass: action.userPass,
                        authType: action.authType,
                        userName: action.userName,
                        userAge: action.userAge,
                        userAvatar: action.userAvatar,
                        userAboutMe: action.userAboutMe};
                    webSocket.send(JSON.stringify(messageText));
                }, 1000);
                break;
            case 'USER_EXIT':
                localStorage.setItem('jwt', null); // correct to jwt deletion
                webSocket.close();
                break;
            default:
                return next(action);
        }
    };
}
