const initialState = {
    loaded: false,
    message: 'Just created',
    connected: false,
    history: [],
    message_history: []
};

import {
    SOCKETS_CONNECTING,
    SOCKETS_DISCONNECTING,
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SENDING
}
    from '../constants/SocketsComponent';

export default function socketMessageLog(state = initialState, action = {}) {
    switch (action.type) {
        case SOCKETS_CONNECTING:
            return Object.assign({}, state, {
                loaded: true,
                message: 'Connecting...',
                connected: true,
                history: [
                    ...state.history,
                    {
                        loaded: true,
                        message: 'Connecting...',
                        connected: true
                    }
                ]
            });
        case SOCKETS_DISCONNECTING:
            return Object.assign({}, state, {
                loaded: true,
                message: 'Disconnecting...',
                connected: false,
                history: [
                    ...state.history,
                    {
                        loaded: true,
                        message: 'Disconnecting...',
                        connected: false
                    }
                ]
            });
        case SOCKETS_MESSAGE_SENDING:
            return Object.assign({}, state, {
                loaded: true,
                message: 'Send message',
                connected: true,
                message_history: [
                    ...state.message_history,
                    {
                        direction: '->',
                        message: action.message_send
                    }
                ]
            });
        case SOCKETS_MESSAGE_RECEIVING:
            return Object.assign({}, state, {
                loaded: true,
                message: 'Message receive',
                connected: true,
                message_history: [
                    ...state.message_history,
                    {
                        direction: '<-',
                        message: action.message_receive
                    }
                ]
            });
        default:
            return state;
    }
}