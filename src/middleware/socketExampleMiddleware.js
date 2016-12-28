import * as socketExampleActions from '../actions/chatActions';

export default function socketExampleMiddleware() {
    let socketExample = null;

    const onOpen = (token) => evt => {
        console.log('WS is onOpen');
        console.log('token ' + token);
        console.log('evt ' + evt.data);
    };
    const onClose = (store) => evt => {
        console.log('WS is onClose');
        console.log('evt ' + evt.data);
        store.dispatch(socketExampleActions.socketsDisconnect());
    };
    const onMessage = (ws, store) => evt => {
        // Parse the JSON message received on the websocket
        const msg = evt.data;
        store.dispatch(socketExampleActions.socketsMessageReceiving(msg));
    };
    return store => next => action => {
        switch (action.type) {
            case 'SOCKETS_CONNECT':
                if (socketExample !== null) {
                    console.log('SOCKETS_DISCONNECTING');
                    store.dispatch(socketExampleActions.socketsDisconnecting());
                    socket.close();
                }
                console.log('SOCKETS_CONNECTING');
                socketExample = new WebSocket('ws://echo.websocket.org/');
                store.dispatch(socketExampleActions.socketsConnecting());
                socketExample.onmessage = onMessage(socketExample, store);
                socketExample.onclose = onClose(store);
                socketExample.onopen = onOpen(action.token);
                break;
            case 'SOCKETS_DISCONNECT':
                if (socketExample !== null) {
                    console.log('SOCKETS_DISCONNECTING');
                    store.dispatch(socketExampleActions.socketsDisconnecting());
                    socketExample.close();
                }
                socketExample = null;
                break;
            case 'SOCKETS_MESSAGE_SEND':
                console.log('action');
                console.log(action);
                socketExample.send(action.message_send);
                store.dispatch(socketExampleActions.socketsMessageSending(action.message_send));
                break;
            default:
                return next(action);
        }
    };
}