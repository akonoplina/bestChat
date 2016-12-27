import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import * as Bootstrap from 'react-bootstrap';

import AuthComponent from '../components/AuthComponent';

import ChatComponent from '../components/ChatComponent';

import * as chatActions from '../actions/chatActions';

class App extends Component {
    render() {


        const { authReducer, chatReducer } = this.props;

        const { signUpAction, signInAction, OkButtonAction, validateAction, changeDataAction } = this.props.chatActions;



        return <div>
            <AuthComponent validateAction={validateAction} signInAction={signInAction}
                           buttonSignInVisible={authReducer.buttonSignInVisible}
                           showSignInInput={authReducer.showSignInInput}
                           signInButtonTitle={ authReducer.signInButtonTitle}
                           showPass={authReducer.showPass} passwordTitle={ authReducer.passwordTitle }
                           showSignUpInput={authReducer.showSignUpInput}
                           buttonSignUpVisible={authReducer.buttonSignUpVisible}
                           signUpAction={signUpAction} signUpButtonTitle={ authReducer.signUpButtonTitle}
                           okButtonVisible={authReducer.okButtonVisible} OkButtonAction={OkButtonAction}
                           okButtonTitle={authReducer.okButtonTitle}
                           changeDataAction={changeDataAction} signInEmpty={authReducer.signInEmpty}
                           signUpEmpty={authReducer.signUpEmpty} passEmpty={authReducer.passEmpty}/>

            <ChatComponent messageListTitle={chatReducer.messageListTitle} showChatPage={authReducer.showChatPage} />
            </div>
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        chatReducer: state.chatReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
