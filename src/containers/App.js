import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../components/AuthComponent';

import SocketMessageLog from '../components/SocketMessageLog';

import UserComponent from '../components/UserComponent';

import * as chatActions from '../actions/chatActions';

class App extends Component {
    render() {

        const { authReducer, socketReducer, userReducer } = this.props;

        const { signUpAction, signInAction, OkButtonAction, changeDataAction, socketsMessageSend, userLoggedIn,
            userLoggedOut, userLogin, userLogout} = this.props.chatActions;

        return <div>
            <AuthComponent signInAction={signInAction} buttonSignInVisible={authReducer.buttonSignInVisible}
                           showSignInInput={authReducer.showSignInInput}
                           signInButtonTitle={ authReducer.signInButtonTitle}
                           showPass={authReducer.showPass} passwordTitle={ authReducer.passwordTitle }
                           showSignUpInput={authReducer.showSignUpInput}
                           buttonSignUpVisible={authReducer.buttonSignUpVisible}
                           signUpAction={signUpAction} signUpButtonTitle={ authReducer.signUpButtonTitle}
                           okButtonVisible={authReducer.okButtonVisible} OkButtonAction={OkButtonAction}
                           okButtonTitle={authReducer.okButtonTitle}
                           changeDataAction={changeDataAction} buttonDisabled={authReducer.buttonDisabled}
                           validationStateSignIn={authReducer.validationStateSignIn}
                           validationStateSignUp={authReducer.validationStateSignUp}
                           validationStatePass={authReducer.validationStatePass} userLoggedIn={userLoggedIn}
                           userLoggedOut={userLoggedOut} userLogin={userLogin} useLogout={userLogout} />

            <SocketMessageLog showMessageLog={authReducer.showMessageLog} connected={socketReducer.connected}
                              loaded={socketReducer.loaded} message_history={socketReducer.message_history}
                              socketsMessageSend={socketsMessageSend} userName={userReducer.userName} />

            <UserComponent showUser={authReducer.showUser} userName={userReducer.userName}
                           userAboutMe={userReducer.userAboutMe} userAvatar={userReducer.userAvatar}
                           userAge={userReducer.userAge} />

            </div>
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        socketReducer: state.socketReducer,
        userReducer: state.userReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
