const initialState = {
    signInButtonTitle: 'Sign in',
    buttonSignInVisible: true,
    showSignInInput: false
};

import {
    SIGN_IN_BUTTON_PRESSED
} from '../constants/SignIn'

export default function signIn(state = initialState, action) {

    switch (action.type) {
        case SIGN_IN_BUTTON_PRESSED:
            return { ...state, buttonSignInVisible: false, showSignInInput: true};
        default:
            return state;
    }
}