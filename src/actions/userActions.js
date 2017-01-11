import {
    SHOW_MORE_ACTION,
    SHOW_LESS_ACTION
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
