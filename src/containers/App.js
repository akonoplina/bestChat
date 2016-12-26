import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import AuthComponent from '../components/AuthComponent';

import * as chatActions from '../actions/chatActions';

class App extends Component {
    render() {
        const { authReducer } = this.props;
        const { signUpAction, signInAction, OkButtonAction } = this.props.chatActions;

        return <div className='loginForm'>
            <AuthComponent signInAction={signInAction} buttonSignInVisible={authReducer.buttonSignInVisible}
                           showSignInInput={authReducer.showSignInInput} signInButtonTitle={ authReducer.signInButtonTitle}
                           showPass={authReducer.showPass} passwordTitle={ authReducer.passwordTitle }
                           showSignUpInput={authReducer.showSignUpInput}  buttonSignUpVisible={authReducer.buttonSignUpVisible}
                           signUpAction={signUpAction} signUpButtonTitle={ authReducer.signUpButtonTitle}
                           okButtonVisible={authReducer.okButtonVisible} OkButtonAction={OkButtonAction}
                           okButtonTitle={authReducer.okButtonTitle}/>
            </div>
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
