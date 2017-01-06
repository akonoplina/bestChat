import {
    SOCKETS_CONNECTING,
    SOCKETS_DISCONNECTING,
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SENDING,
} from '../constants/SocketsComponent';

const initialState = {
  connected: false,
  messageHistory: [],
};

export default function socketReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SOCKETS_CONNECTING:
      return { ...state, connected: true };
    case SOCKETS_DISCONNECTING:
      return { ...state, connected: false };
    case SOCKETS_MESSAGE_SENDING:
      return {
        ...state,
        connected: true,
        messageHistory: [
          ...state.messageHistory,
          {
            direction: '->',
            message: action.messageSend,
            userName: action.userName,
            userAvatar: action.userAvatar,
          },
        ] };
    case SOCKETS_MESSAGE_RECEIVING:
      return {
        ...state,
        connected: true,
        messageHistory: [
          ...state.messageHistory,
          {
            direction: '<-',
            message: action.messageReceive,
            userName: action.userName,
            userAvatar: action.userAvatar,
          },
        ] };
    default:
      return state;
  }
}
