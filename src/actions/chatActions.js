import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    USER_LOGIN,
    USER_LOGOUT,
    AUTH_SEND_DATA,
    USER_EXIT,
    DISPLAY_ERROR_MESSAGE,
} from '../constants/AuthComponent';

import {
    SOCKETS_CONNECTING,
    SOCKETS_DISCONNECTING,
    SOCKETS_MESSAGE_SENDING,
    SOCKETS_MESSAGE_RECEIVING,
    SOCKETS_MESSAGE_SEND,
    SOCKETS_CONNECT,
    SOCKETS_DISCONNECT,
} from '../constants/SocketsComponent';

import {
    SHOW_MORE_ACTION,
    SHOW_LESS_ACTION,
} from '../constants/UserComponent';

export function signInAction() {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN_BUTTON_PRESSED,
    });
  };
}
export function signUpAction() {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP_BUTTON_PRESSED,
    });
  };
}
export function userLogin(userName, userAvatar, userAboutMe, userAge) {
  return (dispatch) => {
    dispatch({
      type: USER_LOGIN,
      userName,
      userAvatar,
      userAboutMe,
      userAge,
    });
  };
}
export function userLogout(userName, userAvatar, userAboutMe, userAge) {
  return (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
      userName,
      userAvatar,
      userAboutMe,
      userAge,
    });
  };
}
export function displayErrorMessage(errorMessage) {
  return (dispatch) => {
    dispatch({
      type: DISPLAY_ERROR_MESSAGE,
      errorMessage,
    });
  };
}
export function changeDataAction(fieldName, validationPassed = false, validateData = null) {
  let type = '';
  let status = '';
  let validationStateSignIn = null;
  let validationStateSignUp = null;
  let validationStatePass = null;
  let buttonDisabled = true;

  if (validationPassed === true) {
    status = 'PASSED';
    buttonDisabled = false;
  } else {
    status = 'FAILED';
  }
  switch (fieldName) {
    case 'signIn':
      type = 'SIGN_IN_VALIDATION_' + status;
      validationStateSignIn = validateData;
      break;
    case 'signUp':
      type = 'SIGN_UP_VALIDATION_' + status;
      validationStateSignUp = validateData;
      break;
    case 'pass':
      type = 'PASS_VALIDATION_' + status;
      validationStatePass = validateData;
      break;
    default:
      break;
  }

  return (dispatch) => {
    dispatch({
      type,
      validationStateSignIn,
      validationStateSignUp,
      validationStatePass,
      buttonDisabled,
    });
  };
}

export function socketsConnecting() {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_CONNECTING,
    });
  };
}
export function socketsConnect() {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_CONNECT,
    });
  };
}
export function socketsDisconnecting() {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_DISCONNECTING,
    });
  };
}
export function socketsDisconnect() {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_DISCONNECT,
    });
  };
}
export function socketsMessageSending(sendMessage, userName, userAvatar) {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_MESSAGE_SENDING,
      messageSend: sendMessage,
      userName,
      userAvatar,
    });
  };
}
export function socketsMessageSend(sendMessage, userName, userAvatar) {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_MESSAGE_SEND,
      messageSend: sendMessage,
      userName,
      userAvatar,
    });
  };
}
export function socketsMessageReceiving(receiveMessage, userName, userAvatar) {
  return (dispatch) => {
    dispatch({
      type: SOCKETS_MESSAGE_RECEIVING,
      messageReceive: receiveMessage,
      userName,
      userAvatar,
    });
  };
}
export function authSendData(userLogin, userPass, authType) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SEND_DATA,
      userLogin,
      userPass,
      authType,
    });
  };
}
export function userExit(userName, userAvatar, userAboutMe, userAge) {
  return (dispatch) => {
    dispatch({
      type: USER_EXIT,
      userName,
      userAvatar,
      userAboutMe,
      userAge,
    });
  };
}
export function showMoreAction() {
  return (dispatch) => {
    dispatch({
      type: SHOW_MORE_ACTION,
    });
  };
}
export function showLessAction() {
  return (dispatch) => {
    dispatch({
      type: SHOW_LESS_ACTION,
    });
  };
}
