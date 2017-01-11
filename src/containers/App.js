import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../components/AuthComponent';

import SocketComponent from '../components/SocketComponent';

import UserComponent from '../components/UserComponent';

import * as authActions from '../actions/authActions';

import * as userActions from '../actions/userActions';

import * as socketActions from '../actions/socketActions';

class App extends Component {
    render() {
        const { authReducer, socketReducer, userReducer } = this.props;

        const { signUpAction, signInAction, changeDataAction, authSendData, userExit } = this.props.authActions;
        const { socketsConnect, socketsMessageSend } = this.props.socketActions;
        const { showMoreAction, showLessAction } = this.props.userActions;

        return (<div>
            <AuthComponent
                signInAction={signInAction} buttonSignInVisible={authReducer.buttonSignInVisible}
                showSignInInput={authReducer.showSignInInput}
                showPass={authReducer.showPass}
                showSignUpInput={authReducer.showSignUpInput} showAuthWrapper={authReducer.showAuthWrapper}
                buttonSignUpVisible={authReducer.buttonSignUpVisible}
                signUpAction={signUpAction}
                okButtonVisible={authReducer.okButtonVisible}
                changeDataAction={changeDataAction} buttonDisabled={authReducer.buttonDisabled}
                validationStateSignIn={authReducer.validationStateSignIn}
                validationStateSignUp={authReducer.validationStateSignUp}
                validationStatePass={authReducer.validationStatePass} socketsConnect={socketsConnect}
                authSendData={authSendData}
                errorMessage={authReducer.errorMessage}
            />

            <SocketComponent
                connected={socketReducer.connected} messageHistory={socketReducer.messageHistory}
                socketsMessageSend={socketsMessageSend} userName={authReducer.userName}
                userAvatar={authReducer.userAvatar}
            />

            <UserComponent
                showLessAction={showLessAction} showMoreAction={showMoreAction}
                showUser={authReducer.showUser} userName={authReducer.userName}
                userAboutMe={authReducer.userAboutMe}
                userAvatar={authReducer.userAvatar} userAge={authReducer.userAge}
                userExit={userExit} showMore={userReducer.showMore}
            />
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        socketReducer: state.socketReducer,
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        socketActions: bindActionCreators(socketActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
