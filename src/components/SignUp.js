import React, { PropTypes, Component } from 'react';

export default class SignUp extends Component {
    onSignUpButtonPress(){
        this.props.signUpAction();
    }
    render() {
        const { signUpButtonTitle, buttonSignUpVisible, showSignUpInput } = this.props;
        return <div className={'signUp ' + (buttonSignUpVisible ? 'none':'')}>
            <button onClick={::this.onSignUpButtonPress}>{signUpButtonTitle}</button>
            <p className={(!showSignUpInput ? 'none':'')}><label>{signUpButtonTitle}:</label><input type="text" placeholder={signUpButtonTitle} /></p>
        </div>
    }
}

SignUp.propTypes = {
    signUpButtonTitle: PropTypes.string.isRequired,
    signUpAction: PropTypes.func.isRequired
};