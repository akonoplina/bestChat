const initialState = {
    signUpButtonTitle: 'Sign up',
    buttonSignInVisible: true,
    buttonSignUpVisible: true,
    showSignInInput: false,
    showSignUpInput: false,
    showPass: false,
    okButtonVisible: false
};

import {
    SIGN_UP_BUTTON_PRESSED
} from '../constants/SignUp'

export default function signUp(state = initialState, action) {

    switch (action.type) {
        case SIGN_UP_BUTTON_PRESSED:
            return { ...state, buttonSignInVisible:false, buttonSignUpVisible:false, showSignInInput:true,
                showSignUpInput:false, showPass:true, okButtonVisible:true};
        default:
            return state;
    }

}