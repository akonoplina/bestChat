import React, { PropTypes, Component } from 'react';

export default class AuthComponent extends Component {
    onSignInButtonPress(){

        this.props.signInAction();

    }
    onSignUpButtonPress(){

        this.props.signUpAction();

    }
    onOkButtonPress(){
        this.props.OkButtonAction();
    }
    render() {
        const { signInButtonTitle, buttonSignInVisible, showSignInInput } = this.props;
        const { signUpButtonTitle, buttonSignUpVisible, showSignUpInput } = this.props;
        const { okButtonTitle, okButtonVisible } = this.props;
        const { passwordTitle, showPass } = this.props;

        return <div className="wrapper">
            <div>
                <button ref="signInButton" className={'signIn ' + (!buttonSignInVisible ? 'none':'')} onClick={::this.onSignInButtonPress} >{signInButtonTitle}</button>
                <p ref="signInInput" className={(!showSignInInput ? 'none':'')}><label>{signInButtonTitle}:</label><input type="text" placeholder={signInButtonTitle} /></p>
            </div>
            <div>
                <button ref="signUpButton" className={'signUp ' + (!buttonSignUpVisible ? 'none':'')} onClick={::this.onSignUpButtonPress}>{signUpButtonTitle}</button>
                <p ref="signUpInput" className={(!showSignUpInput ? 'none':'')}><label>{signUpButtonTitle}:</label><input type="text" placeholder={signUpButtonTitle} /></p>
            </div>
            <button ref="okButton" onClick={::this.onOkButtonPress} className={'okButton ' + (!okButtonVisible ? 'none' : '')}>{okButtonTitle}</button>
            <div ref="pass" className={'pass ' + (!showPass ? 'none' : '')}>
                <p><label>{passwordTitle}:</label><input type="text" placeholder={passwordTitle} /></p>
            </div>
        </div>
    }
}

AuthComponent.propTypes = {
    signInButtonTitle: PropTypes.string.isRequired,
    signInAction: PropTypes.func.isRequired,
    buttonSignInVisible: PropTypes.bool.isRequired,
    showSignInInput: PropTypes.bool.isRequired,
    signUpButtonTitle: PropTypes.string.isRequired,
    signUpAction: PropTypes.func.isRequired,
    buttonSignUpVisible: PropTypes.bool.isRequired,
    showSignUpInput: PropTypes.bool.isRequired,
    okButtonTitle: PropTypes.string.isRequired,
    OkButtonAction: PropTypes.func.isRequired,
    okButtonVisible: PropTypes.bool.isRequired,
    passwordTitle: PropTypes.string.isRequired,
    showPass: PropTypes.bool.isRequired
};