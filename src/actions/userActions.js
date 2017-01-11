import {
    SHOW_MORE_ACTION,
    SHOW_LESS_ACTION,
    USER_LOGIN,
    USER_LOGOUT
} from '../constants/UserComponent';

export function showMoreAction() {
    return (dispatch) => {
        dispatch({
            type: SHOW_MORE_ACTION
        });
    };
}
export function showLessAction() {
    return (dispatch) => {
        dispatch({
            type: SHOW_LESS_ACTION
        });
    };
}
export function userLoginAction(userName, userAvatar, userAboutMe, userAge) {
    return (dispatch) => {
        dispatch({
            type: USER_LOGIN,
            userName,
            userAvatar,
            userAboutMe,
            userAge
        });
    };
}
export function userLogout(userName, userAvatar, userAboutMe, userAge) {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT,
            userName,
            userAvatar,
            userAboutMe,
            userAge
        });
    };
}
