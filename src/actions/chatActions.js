import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    OK_BUTTON_PRESSED,
    SEND_MESSAGE
} from '../constants/AuthComponent';

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
