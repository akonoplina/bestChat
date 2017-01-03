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

    buttonDisabled: true,

    showUser: false,

    validationStateSignIn: null,
    validationStateSignUp: null,
    validationStatePass: null,

    errorMessage: '',

    userName: 'Anastacia',
    userAvatar: 'tyty',
    userAge: '30',
    userAboutMe: 'Just another junior UI dev)))'
};

import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    PASS_VALIDATION_PASSED,
    SIGN_IN_VALIDATION_PASSED,
    SIGN_UP_VALIDATION_PASSED,
    PASS_VALIDATION_FAILED,
    SIGN_IN_VALIDATION_FAILED,
    SIGN_UP_VALIDATION_FAILED,
    DISPLAY_ERROR_MESSAGE,
    USER_LOGIN,
    USER_LOGOUT

} from '../constants/AuthComponent';

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case SIGN_IN_BUTTON_PRESSED:
            return { ...state, buttonSignInVisible: false, showSignInInput: true, buttonSignUpVisible: false,
                showSignUpInput: false, showPass: true, okButtonVisible: true};
        case SIGN_UP_BUTTON_PRESSED:
            return { ...state, buttonSignUpVisible: false, showSignUpInput: true, buttonSignInVisible: false,
                showSignInInput: false, showPass: true, okButtonVisible: true};
        case SIGN_IN_VALIDATION_PASSED:
            return {...state, validationStateSignIn: action.validationStateSignIn, buttonDisabled: action.buttonDisabled};
        case SIGN_UP_VALIDATION_PASSED:
            return {...state, validationStateSignUp: action.validationStateSignUp, buttonDisabled: action.buttonDisabled};
        case PASS_VALIDATION_PASSED:
            return {...state, validationStatePass: action.validationStatePass, buttonDisabled: action.buttonDisabled};
        case SIGN_IN_VALIDATION_FAILED:
            return {...state, validationStateSignIn: action.validationStateSignIn, buttonDisabled: action.buttonDisabled};
        case SIGN_UP_VALIDATION_FAILED:
            return {...state, validationStateSignUp: action.validationStateSignUp, buttonDisabled: action.buttonDisabled};
        case PASS_VALIDATION_FAILED:
            return {...state, validationStatePass: action.validationStatePass, buttonDisabled: action.buttonDisabled};
        case DISPLAY_ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage};
        case USER_LOGIN:
            return {...state, showSignInInput: false, showSignUpInput: false, showPass: false, okButtonVisible: false,
                showUser: true, userName: action.userName, userAge: action.userAge, userAboutMe: action.userAboutMe,
                userAvatar: action.userAvatar};
        case USER_LOGOUT:
            return {...state, userName: action.user};
            default:
            return state;
    }
}