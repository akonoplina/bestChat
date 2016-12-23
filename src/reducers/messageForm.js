const initialState = {
    messageFormTitle: 'Please enter your message!!!'
};

import {
    SEND_MESSAGE
} from '../constants/SendMessage'

export default function messageForm(state = initialState, action) {

    switch (action.type) {
        case SEND_MESSAGE:
            return { ...state, messageSend: true};
        default:
            return state;
    }

}