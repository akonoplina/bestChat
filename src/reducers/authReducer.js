import {
    DISPLAY_ERROR_MESSAGE

} from '../constants/AuthComponent';

const initialState = {
    errorMessage: ''
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage };
        default:
            return state;
    }
}
