import {
    SIGN_IN_BUTTON_PRESSED
} from '../constants/SignIn';

import {
    SIGN_UP_BUTTON_PRESSED
} from '../constants/SignUp';

import {
    OK_BUTTON_PRESSED
} from '../constants/OkButton';

export function signInAction() {

    return (dispatch) => {
        dispatch({
            type: SIGN_IN_BUTTON_PRESSED
        });
    }
}
export function signUpAction() {

    return (dispatch) => {
        dispatch({
            type: SIGN_UP_BUTTON_PRESSED
        });
    }
}
export function OkButtonAction() {

    return (dispatch) => {
        dispatch({
            type: OK_BUTTON_PRESSED
        });
    }
}
