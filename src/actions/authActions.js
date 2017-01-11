import {
    AUTH_SEND_DATA,
    USER_EXIT,
    DISPLAY_ERROR_MESSAGE
} from '../constants/AuthComponent';


export function displayErrorMessage(errorMessage) {
    return (dispatch) => {
        dispatch({
            type: DISPLAY_ERROR_MESSAGE,
            errorMessage
        });
    };
}
export function authSendData(userLogin, userPass, authType) {
    return (dispatch) => {
        dispatch({
            type: AUTH_SEND_DATA,
            userLogin,
            userPass,
            authType
        });
    };
}
export function userExit(userName, userAvatar, userAboutMe, userAge) {
    return (dispatch) => {
        dispatch({
            type: USER_EXIT,
            userName,
            userAvatar,
            userAboutMe,
            userAge
        });
    };
}
