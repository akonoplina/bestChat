import {
    DISPLAY_ERROR_MESSAGE,
    USER_LOGGED_IN

} from '../constants/AuthComponent';

const initialState = {
    errorMessage: '',
    userLoggedIn: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage };
        case USER_LOGGED_IN:
            return {
                ...state,
                userLoggedIn: true };
        default:
            return state;
    }
}
