import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Password from '../components/Password';
import OkButton from '../components/OkButton';

import * as chatActions from '../actions/chatActions';

class App extends Component {
    render() {

        const { signIn, signUp, password, okButton } = this.props;
        const { signUpAction, signInAction, OkButtonAction } = this.props.chatActions;

        return <div className='loginForm'>
            <SignIn signInAction={signInAction} buttonSignInVisible={signIn.buttonSignInVisible}
                    showSignInInput={signIn.showSignInInput} signInButtonTitle={ signIn.signInButtonTitle}/>
            <Password showPass={password.showPass} passwordTitle={ password.passwordTitle }/>
            <SignUp showSignUpInput={signUp.showSignUpInput}  buttonSignUpVisible={signUp.buttonSignUpVisible}
                    signUpAction={signUpAction} signUpButtonTitle={ signUp.signUpButtonTitle}/>
            <OkButton okButtonVisible={okButton.okButtonVisible} OkButtonAction={OkButtonAction} okButtonTitle={okButton.okButtonTitle}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        signIn: state.signIn,
        signUp: state.signUp,
        password: state.password,
        okButton: state.okButton
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
