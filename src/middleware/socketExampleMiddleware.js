import * as chatActions from '../actions/chatActions';

export default function webSocketMiddleware() {

    let webSocket = null;

    const onOpen = (token) => evt => {
        console.log('WS is onOpen');
    };
    const onClose = (store) => evt => {
        console.log('WS is onClose');
        store.dispatch(chatActions.userLoggedOut());
    };
    const onMessage = (ws, store) => evt => {
        // Parse the JSON message received on the websocket
        const msg = evt.data;
        store.dispatch(chatActions.socketsMessageReceiving(msg));
    };
    return store => next => action => {
        switch (action.type) {
            case 'USER_LOGIN':
                if (webSocket !== null) {
                    console.log('WEBSOCKETS_DISCONNECTING');
                    store.dispatch(chatActions.userLoggedOut());
                    webSocket.close();
                }
                console.log('WEBSOCKETS_CONNECTING');
                webSocket = new WebSocket('ws://127.0.0.1:5000');
                // отправить данные на сервер, ждать ответ, либо UserObj, либо error!
                webSocket.onmessage = onMessage(webSocket, store);
                webSocket.onclose = onClose(store);
                webSocket.onopen = onOpen(action.token);
                webSocket.send('hello!!!');
                webSocket.send({userLogin: action.userLogin, userPass: action.userPass});
                store.dispatch(chatActions.userLoggedIn(action.userLogin, action.userPass));
                break;
            case 'USER_LOGOUT':
                if (webSocket !== null) {
                    console.log('WEBSOCKETS_DISCONNECTING');
                    store.dispatch(chatActions.userLoggedOut());
                    webSocket.close();
                }
                webSocket = null;
                break;
            case 'SEND_MESSAGE':
                console.log('action');
                console.log(action);
                webSocket.send(action.message_send);
                store.dispatch(chatActions.socketsMessageSending(action.message_send));
                break;
            default:
                return next(action);
        }
    };
}