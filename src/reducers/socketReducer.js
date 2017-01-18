import {
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SENDING
} from '../constants/SocketComponent';

const initialState = {
    messageHistory: [],
    userAvatar: '',
    userName: ''
};

export default function socketReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SOCKETS_MESSAGE_SENDING:
            return {
                ...state,
                messageHistory: [
                    ...state.messageHistory,
                    {
                        message: action.messageSend,
                        userName: action.userName,
                        userAvatar: action.userAvatar
                    }
                ] };
        case SOCKETS_MESSAGE_RECEIVING:
            return {
                ...state,
                messageHistory: [
                    ...state.messageHistory,
                    {
                        message: action.messageReceive,
                        userName: action.userName,
                        userAvatar: action.userAvatar
                    }
                ] };
        default:
            return state;
    }
}
