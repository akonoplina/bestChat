import {
    SHOW_MORE_ACTION,
    SHOW_LESS_ACTION,
    USER_LOGIN,
    USER_LOGOUT
} from '../constants/UserComponent';

const initialState = {
    showUser: false,
    showMore: false,
    userName: '',
    userAge: '',
    userAboutMe: '',
    userAvatar: ''
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MORE_ACTION:
            return { ...state, showMore: true };
        case SHOW_LESS_ACTION:
            return { ...state, showMore: false };
        case USER_LOGIN:
            return {
                ...state,
                showUser: true,
                userName: action.userName,
                userAge: action.userAge,
                userAboutMe: action.userAboutMe,
                userAvatar: action.userAvatar };
        case USER_LOGOUT:
            return {
                ...state,
                showUser: false,
                userName: action.userName,
                userAge: action.userAge,
                userAboutMe: action.userAboutMe,
                userAvatar: action.userAvatar };
        default:
            return state;
    }
}
