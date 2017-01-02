const initialState = {
  userName: 'Anastacia',
  userAvatar: 'tyty',
  userAge: '30',
  userAboutMe: 'Just another junior UI dev)))'
};

import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../constants/UserComponent';

export default function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return state;
        case USER_LOGGED_OUT:
            return state;
        default:
            return state;

    }
}