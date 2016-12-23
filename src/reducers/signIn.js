const initialState = {
    signInButtonTitle: 'Sign in',
    buttonSignInVisible: true,
    buttonSignUpVisible: true,
    showSignInInput: false,
    showSignUpInput: false,
    showPass: false,
    okButtonVisible: false
};

import {
    SIGN_IN_BUTTON_PRESSED
} from '../constants/SignIn'

export default function signIn(state = initialState, action) {

    switch (action.type) {
        case SIGN_IN_BUTTON_PRESSED:
            return { ...state, buttonSignInVisible:false, buttonSignUpVisible:false, showSignInInput:true,
                showSignUpInput:false, showPass:true, okButtonVisible:true};
        default:
            return state;
    }

}