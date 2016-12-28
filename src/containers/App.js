import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../components/AuthComponent';

import ChatComponent from '../components/ChatComponent';

import SocketConnectionLog from '../components/SocketConnectionLog';

import SocketMessageLog from '../components/SocketMessageLog';

import * as chatActions from '../actions/chatActions';

class App extends Component {
    render() {

        const { authReducer, chatReducer, socketReducer } = this.props;

        const { signUpAction, signInAction, OkButtonAction, validateAction, changeDataAction, socketsConnecting,
            socketsDisconnecting, socketsMessageSend, socketsConnect, socketsDisconnect} = this.props.chatActions;

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


            <SocketConnectionLog connectAction={socketsConnecting} history={socketReducer.history}
                                 disconnectAction={socketsDisconnecting}
                                 message={socketReducer.message} loaded={socketReducer.loaded}
                                 connected={socketReducer.connected} showConnectionLog={authReducer.showConnectionLog}/>

            <SocketMessageLog showMessageLog={authReducer.showMessageLog} connected={socketReducer.connected}
                              loaded={socketReducer.loaded} message_history={socketReducer.message_history}
                              socketsMessageSend={socketsMessageSend}/>


            </div>
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        chatReducer: state.chatReducer,
        socketReducer: state.socketReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
