const initialState = {
    signInButtonTitle: 'Sign in',
    buttonSignInVisible: true,
    showSignInInput: false,
    signUpButtonTitle: 'Sign up',
    buttonSignUpVisible: true,
    showSignUpInput: false,
    passwordTitle: 'Password',
    showPass: false,
    okButtonTitle: 'Ok',
    okButtonVisible: false,
    messageListTitle: 'Welcome to the chat!!!',
    messageFormTitle: 'Please enter your message!!!',
    showChatPage: false
};

import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    OK_BUTTON_PRESSED,
    SEND_MESSAGE

} from '../constants/AuthComponent';

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case SIGN_IN_BUTTON_PRESSED:
            return { ...state, buttonSignInVisible: false, showSignInInput: true, buttonSignUpVisible: false,
                showSignUpInput: false, showPass: true, okButtonVisible: true};
        case SIGN_UP_BUTTON_PRESSED:
            return { ...state, buttonSignUpVisible: false, showSignUpInput: true, buttonSignInVisible: false,
                showSignInInput: false, showPass: true, okButtonVisible: true};
        case OK_BUTTON_PRESSED:
            return { ...state, showChatPage: true, showWelcomeMessage: true};
        case SEND_MESSAGE:
            return { ...state, messageSend: true};
        default:
            return state;
    }
}