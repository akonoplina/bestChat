import {
    USER_LOGIN,
    USER_LOGOUT
} from '../constants/UserComponent';

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
