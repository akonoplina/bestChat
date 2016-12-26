const initialState = {
    signUpButtonTitle: 'Sign up',
    buttonSignUpVisible: true,
    showSignUpInput: false
};

import {
    SIGN_UP_BUTTON_PRESSED
} from '../constants/SignUp'

export default function signUp(state = initialState, action) {

    switch (action.type) {
        case SIGN_UP_BUTTON_PRESSED:
            return { ...state, buttonSignUpVisible:false, showSignUpInput:true};
        default:
            return state;
    }

}