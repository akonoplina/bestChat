const initialState = {
    showMore: false
};

import {
    SHOW_MORE_ACTION,
    SHOW_LESS_ACTION
} from '../constants/UserComponent';

export default function userReducer(state = initialState, action){
    switch(action.type){
        case 'SHOW_MORE_ACTION':
            return {...state, showMore: true};
        case 'SHOW_LESS_ACTION':
            return {...state, showMore: false};
        default:
            return state;
    }
};