import * as authActions from '../actions/authActions';

import * as socketActions from '../actions/socketActions';

export default function webSocketMiddleware() {
    let webSocket = null;

    const waitForConnection = (callback, interval) => {
        if (webSocket.readyState === 1) {
            callback();
        } else {
            setTimeout(() => {
                waitForConnection(callback, interval);
            }, interval);
        }
    };
    const onClose = store => () => {
        store.dispatch(socketActions.socketsDisconnect());
    };
    const onMessage = (ws, store) => (evt) => {
        let msg = evt.data;
        msg = JSON.parse(msg);

        const error = msg.errorText;
        const connectionType = msg.connectionType; // auth or message
        const authType = msg.authType; // signIn or signOut
        let userObj = {};
        let userName = '';
        let userAvatar = '';
        let userMessage = '';

        const jwt = msg.token;
        if (jwt) {
            const symbol = /\./;
            const start = symbol.exec(jwt).index;
            let resultStr = jwt.substr(start + 1);
            const finish = symbol.exec(resultStr).index;
            resultStr = resultStr.substr(0, finish);

            /* global window*/

            let jwtDeciphered = window.atob(resultStr);

            jwtDeciphered = JSON.parse(jwtDeciphered);

            userObj = jwtDeciphered.userObj;
        }
        switch (connectionType) {
            case 'auth': {
                if (authType === 'signIn') {
                    if (Object.keys(userObj).length > 0) {
                        store.dispatch(authActions.userLoggedIn(userObj));
                    } else if (typeof error !== 'undefined' && error.length > 0) {
                        store.dispatch(authActions.displayErrorMessage(error));
                    } else {
                        store.dispatch(authActions.displayErrorMessage('server-side error appeared'));
                    }
                } else if (authType === 'signUp') {
                    if (Object.keys(userObj).length > 0) {
                        store.dispatch(authActions.userLoggedIn(userObj));
                    } else if (typeof error !== 'undefined' && error.length > 0) {
                        store.dispatch(authActions.displayErrorMessage(error));
                    } else {
                        store.dispatch(authActions.displayErrorMessage('server-side error appeared'));
                    }
                }
                break;
            }
            case 'message': {
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
            }
            default: {
                break;
            }
        }
    };
    return store => next => (action) => {
        switch (action.type) {
            case 'SOCKETS_CONNECT': {
                /* global localStorage*/
                /* global WebSocket*/
                console.log('1');
                if (webSocket !== null) {
                    localStorage.removeItem('connected');
                    console.log('2');
                    webSocket.close();
                    console.log('3');
                }
                webSocket = new WebSocket('ws://127.0.0.1:5000');
                webSocket.onmessage = onMessage(webSocket, store);
                webSocket.onclose = onClose(store);
                localStorage.setItem('connected', true);
                console.log('4');
                break;
            }
            case 'SOCKETS_DISCONNECT': {
                if (webSocket !== null) {
                    localStorage.removeItem('connected');
                    webSocket.close();
                }
                webSocket = null;
                break;
            }
            case 'SOCKETS_MESSAGE_SEND': {
                waitForConnection(() => {
                    webSocket.send(JSON.stringify({
                        userMessage: action.messageSend,
                        userName: action.userName,
                        userAvatar: action.userAvatar }));
                }, 1000);
                store.dispatch(socketActions.socketsMessageSending(action.messageSend, action.userName,
                    action.userAvatar));
                break;
            }
            case 'AUTH_SEND_DATA': {
                /* global WebSocket*/
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
            }
            case 'USER_EXIT': {
                localStorage.removeItem('userObj');
                localStorage.removeItem('connected');
                webSocket.close();
                break;
            }
            default: {
                return next(action);
            }
        }
    };
}
