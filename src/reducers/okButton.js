const initialState = {
    okButtonTitle: 'Ok',
    okButtonVisible: false
};

import {
    OK_BUTTON_PRESSED
} from '../constants/OkButton'

export default function okButton(state = initialState, action) {

    switch (action.type) {
        case OK_BUTTON_PRESSED:
            return { ...state, showMessageList: true, showMessageForm: true};
        default:
            return state;
    }

}