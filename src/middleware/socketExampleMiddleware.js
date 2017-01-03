import * as chatActions from '../actions/chatActions';

export default function webSocketMiddleware() {

    let webSocket = null;

    const onOpen = (token) => evt => {
        console.log('WS is onOpen');
    };
    const onClose = (store) => evt => {
        console.log('WS is onClose');
        console.log('evt ' + evt.data);
        store.dispatch(chatActions.socketsDisconnect());
    };
    const waitForConnection = (callback, interval)=> {
        if (webSocket.readyState === 1) {
            callback();
        } else {
            setTimeout(function () {
               waitForConnection(callback, interval);
            }, interval);
        }
    };
    const onMessage = (ws, store) => evt => {
        // Parse the JSON message received on the websocket
        let msg = evt.data;
        msg = JSON.parse(msg);
        const error = msg.errorText;
        const user = msg.user;
        const connectionType = msg.connectionType; // auth or message
        const authType = msg.authType; // signIn or signOut

        switch (connectionType){
            case 'auth':
                if(authType === 'signIn'){
                    if(Object.keys(user).length > 0){
                        store.dispatch(chatActions.userLogin(user)); // move to the chat page, user exists
                    }
                    else{
                        if(error.length > 0){
                            store.dispatch(chatActions.displayErrorMessage(errorMessage)); // add to actions
                        }
                        else{
                            store.dispatch(chatActions.displayErrorMessage({errorMessage: 'serverside error appeared'}));
                            // error appeared on server side
                        }
                    }
                }
                else if(authType === 'signUp'){
                    if(user.length > 0){
                        store.dispatch(chatActions.userLogin(user)); // move to the chat page, user created successfully
                    }
                    else{
                        if(error.length > 0){
                            store.dispatch(chatActions.displayErrorMessage(errorMessage)); // add to actions, user wasn't created
                        }
                        else{
                            store.dispatch(chatActions.displayErrorMessage({errorMessage: 'serverside error appeared'}));
                            // error appeared on server side
                        }
                    }
                }
                else{

                }
                break;
            case 'message':
                store.dispatch(chatActions.socketsMessageReceiving(msg));
                break;
            default:
                break;
        }
    };
    return store => next => action => {
        switch (action.type) {
            case 'SOCKETS_CONNECT':
                if (webSocket !== null) {
                    console.log('SOCKETS_DISCONNECTING');
                    store.dispatch(chatActions.socketsDisconnecting());
                    webSocket.close();
                }
                console.log('SOCKETS_CONNECTING');
                webSocket = new WebSocket('ws://127.0.0.1:5000');
                store.dispatch(chatActions.socketsConnecting());
                webSocket.onmessage = onMessage(webSocket, store);
                webSocket.onclose = onClose(store);
                webSocket.onopen = onOpen(action.token);
                break;
            case 'SOCKETS_DISCONNECT':
                if (webSocket !== null) {
                    console.log('SOCKETS_DISCONNECTING');
                    store.dispatch(chatActions.socketsDisconnecting());
                    webSocket.close();
                }
                webSocket = null;
                break;
            case 'SEND_MESSAGE':
                console.log('SEND_MESSAGE ACTION');
                console.log(action);
                webSocket.send(action.messageSend); //rename it to userMessage for websockets
                store.dispatch(chatActions.socketsMessageSending(action.messageSend));
                break;
            case 'AUTH_SEND_DATA':
                waitForConnection(function () {
                    console.log('AUTH_SEND_DATA');
                    console.log(action);
                    let messageText = {userLogin: action.userLogin, userPass: action.userPass,
                        authType: action.authType};
                    console.log(messageText);
                    webSocket.send(JSON.stringify(messageText));
                }, 1000);
                break;
            default:
                return next(action);
        }
    };
}