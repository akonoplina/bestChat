import React, { PropTypes, Component } from 'react';

export default class SignIn extends Component {
    onSignInButtonPress(){

        this.props.signInAction();

    }
    render() {
        const { signInButtonTitle, buttonSignInVisible, showSignInInput } = this.props;

        return <div>
            <button ref="signInButton" className={'signIn ' + (!buttonSignInVisible ? 'none':'')} onClick={::this.onSignInButtonPress} >{signInButtonTitle}</button>
            <p ref="signInInput" className={(!showSignInInput ? 'none':'')}><label>{signInButtonTitle}:</label><input type="text" placeholder={signInButtonTitle} /></p>
        </div>
    }
}

SignIn.propTypes = {
    signInButtonTitle: PropTypes.string.isRequired,
    signInAction: PropTypes.func.isRequired,
    buttonSignInVisible: PropTypes.bool.isRequired,
    showSignInInput: PropTypes.bool.isRequired
};