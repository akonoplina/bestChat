import * as chatActions from '../actions/chatActions';

export default function webSocketMiddleware() {
  let webSocket = null;

  const onOpen = () => {

  };
  const onClose = (store) => {
    store.dispatch(chatActions.socketsDisconnect());
  };
  const waitForConnection = (callback, interval) => {
    if (webSocket.readyState === 1) {
      callback();
    } else {
      setTimeout(function () {
        waitForConnection(callback, interval);
      }, interval);
    }
  };
  const onMessage = (ws, store) => (evt) => {
    let msg = evt.data;
    msg = JSON.parse(msg);
    const error = msg.errorText;
    const user = msg.user;

    let userName = '';
    let userAvatar = '';
    let userAboutMe = '';
    let userAge = '';
    let userMessage = '';

    if (typeof user !== 'undefined') {
      if (typeof user.userName !== 'undefined') {
        userName = user.userName;
      }
      if (typeof user.userAvatar !== 'undefined') {
        userAvatar = user.userAvatar;
      }
      if (typeof user.userAboutMe !== 'undefined') {
        userAboutMe = user.userAboutMe;
      }
      if (typeof user.userAge !== 'undefined') {
        userAge = user.userAge;
      }
    }

    const connectionType = msg.connectionType; // auth or message
    const authType = msg.authType; // signIn or signOut

    switch (connectionType) {
      case 'auth':
        if (authType === 'signIn') {
          if (Object.keys(user).length > 0) {
            store.dispatch(chatActions.userLogin(userName, userAvatar, userAboutMe, userAge));
            // move to the chat page, user exists
          } else {
            if (error.length > 0) {
              store.dispatch(chatActions.displayErrorMessage({ errorMessage: error }));
            } else {
              store.dispatch(chatActions.displayErrorMessage({ errorMessage: 'serverside error appeared' }));
            }
          }
        } else if (authType === 'signUp') {
          if (Object.keys(user).length > 0) {
            store.dispatch(chatActions.userLogin(userName, userAvatar, userAboutMe, userAge));
            // move to the chat page, user created successfully
          } else {
            if (error.length > 0) {
              store.dispatch(chatActions.displayErrorMessage({ errorMessage: error }));
            } else {
              store.dispatch(chatActions.displayErrorMessage({ errorMessage: 'serverside error appeared' }));
            }
          }
        }
        break;
      case 'message':
        userMessage = msg.userMessage;
        userName = msg.userName;
        userAvatar = msg.userAvatar;

        store.dispatch(chatActions.socketsMessageReceiving(userMessage, userName, userAvatar));
        break;
      default:
        break;
    }
  };
  return store => next => (action) => {
    switch (action.type) {
      case 'SOCKETS_CONNECT':
        if (webSocket !== null) {
          store.dispatch(chatActions.socketsDisconnecting());
          webSocket.close();
        }
        webSocket = new WebSocket('ws://127.0.0.1:5000');
        webSocket.onmessage = onMessage(webSocket, store);
        webSocket.onclose = onClose(store);
        webSocket.onopen = onOpen(action.token);
        store.dispatch(chatActions.socketsConnecting());
        break;
      case 'SOCKETS_DISCONNECT':
        if (webSocket !== null) {
          store.dispatch(chatActions.socketsDisconnecting());
          webSocket.close();
        }
        webSocket = null;
        break;
      case 'SOCKETS_MESSAGE_SEND':
        webSocket.send(JSON.stringify({
          userMessage: action.messageSend,
          userName: action.userName,
          userAvatar: action.userAvatar }));
        store.dispatch(chatActions.socketsMessageSending(action.messageSend, action.userName,
            action.userAvatar));
        break;
      case 'AUTH_SEND_DATA':
        waitForConnection(function () {
          const messageText = {
            userLogin: action.userLogin,
            userPass: action.userPass,
            authType: action.authType };
          webSocket.send(JSON.stringify(messageText));
        }, 1000);
        break;
      case 'USER_EXIT':
        store.dispatch(chatActions.userLogout(action.userName, action.userAvatar,
            action.userAboutMe, action.userAge));
        webSocket.close();
        break;
      default:
        return next(action);
    }
  };
}
