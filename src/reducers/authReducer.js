const initialState = {
    signInButtonTitle: 'Sign in',
    signUpButtonTitle: 'Sign up',
    passwordTitle: 'Password',
    okButtonTitle: 'Ok',

    buttonSignInVisible: true,
    showSignInInput: false,
    buttonSignUpVisible: true,
    showSignUpInput: false,

    showPass: false,
    okButtonVisible: false,

    showChatPage: false,

    signInEmpty: true,
    signUpEmpty: true,
    passEmpty: true,

    showMessageLog: false,
    showConnectionLog: false
};

import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    OK_BUTTON_PRESSED,
    PASS_ENTERED,
    SIGN_IN_ENTERED,
    SIGN_UP_ENTERED,
    PASS_DELETED,
    SIGN_IN_DELETED,
    SIGN_UP_DELETED

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
            return { ...state, showChatPage: true, showSignInInput : false,
                showSignUpInput: false, showPass: false, okButtonVisible: false, showMessageLog: true,
                showConnectionLog: true};
        case SIGN_IN_ENTERED:
            return {...state, signInEmpty: false, signUpEmpty: false};
        case SIGN_UP_ENTERED:
            return {...state, signUpEmpty: false, signInEmpty: false};
        case PASS_ENTERED:
            return {...state, passEmpty: false};
        case SIGN_IN_DELETED:
            return {...state, signInEmpty: true, signUpEmpty: true};
        case SIGN_UP_DELETED:
            return {...state, signUpEmpty: true, signInEmpty: true};
        case PASS_DELETED:
            return {...state, passEmpty: true};
        default:
            return state;
    }
}