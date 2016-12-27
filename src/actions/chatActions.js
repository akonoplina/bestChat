import {
    SIGN_IN_BUTTON_PRESSED,
    SIGN_UP_BUTTON_PRESSED,
    OK_BUTTON_PRESSED,
    SEND_MESSAGE,
    VALIDATE_DATA,
    SIGN_IN_ENTERED,
    SIGN_UP_ENTERED,
    PASS_ENTERED,
    SIGN_IN_DELETED,
    SIGN_UP_DELETED,
    PASS_DELETED
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
export function validateAction() {

    return (dispatch) => {
        dispatch({
            type: VALIDATE_DATA
        });
    }
}
export function changeDataAction(fieldName, dataEntered = false) {

    let type, status = '';

    if(dataEntered === true){
        status = 'ENTERED';
    } else {
        status = 'DELETED';
    }
    switch(fieldName){
        case 'signInEmpty':
            type = 'SIGN_IN_' + status;
            break;
        case 'signUpEmpty':
            type = 'SIGN_UP_' + status;
            break;
        case 'passEmpty':
            type = 'PASS_' + status;
            break;
        default:
            break;

    }

    return (dispatch) => {
        dispatch({
            type: type
        });
    }
}

