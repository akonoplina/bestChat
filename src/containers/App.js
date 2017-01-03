import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../components/AuthComponent';

import SocketComponent from '../components/SocketComponent';

import UserComponent from '../components/UserComponent';

import * as chatActions from '../actions/chatActions';

class App extends Component {
    render() {

        const { authReducer, socketReducer, userReducer } = this.props;

        const { signUpAction, signInAction, changeDataAction, socketsConnect, socketsDisconnect,
            socketsConnecting, socketsDisconnecting, socketsMessageSend, userLogin, userLogout, authSendData}
            = this.props.chatActions;

        return <div>
            <AuthComponent signInAction={signInAction} buttonSignInVisible={authReducer.buttonSignInVisible}
                           showSignInInput={authReducer.showSignInInput}
                           signInButtonTitle={ authReducer.signInButtonTitle}
                           showPass={authReducer.showPass} passwordTitle={ authReducer.passwordTitle }
                           showSignUpInput={authReducer.showSignUpInput}
                           buttonSignUpVisible={authReducer.buttonSignUpVisible}
                           signUpAction={signUpAction} signUpButtonTitle={ authReducer.signUpButtonTitle}
                           okButtonVisible={authReducer.okButtonVisible}
                           okButtonTitle={authReducer.okButtonTitle}
                           changeDataAction={changeDataAction} buttonDisabled={authReducer.buttonDisabled}
                           validationStateSignIn={authReducer.validationStateSignIn}
                           validationStateSignUp={authReducer.validationStateSignUp}
                           validationStatePass={authReducer.validationStatePass} userLogin={userLogin}
                           userLogout={userLogout} socketsConnect={socketsConnect} socketsDisconnect={socketsDisconnect}
                           socketsConnecting={socketsConnecting} socketsDisconnecting={socketsDisconnecting}
                           authSendData={authSendData} errorMessage={authReducer.errorMessage}/>

            <SocketComponent connected={socketReducer.connected} messageHistory={socketReducer.messageHistory}
                             socketsMessageSend={socketsMessageSend} userName={authReducer.userName} />

            <UserComponent showUser={authReducer.showUser} userName={authReducer.userName}
                           userAboutMe={authReducer.userAboutMe} userAvatar={authReducer.userAvatar}
                           userAge={authReducer.userAge} />

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
