import React, { PropTypes, Component } from 'react';

export default class SignIn extends Component {
    onSignInButtonPress(){
        this.props.signInAction();
    }
    render() {
        const { signInButtonTitle, buttonSignInVisible, showSignInInput } = this.props;
        return <div className={'signIn ' + (buttonSignInVisible ? 'none':'')}>
            <button onClick={::this.onSignInButtonPress} >{signInButtonTitle}</button>
            <p className={(!showSignInInput ? 'none':'')}><label>{signInButtonTitle}:</label><input type="text" placeholder={signInButtonTitle} /></p>
        </div>
    }
}

SignIn.propTypes = {
    signInButtonTitle: PropTypes.string.isRequired,
    signInAction: PropTypes.func.isRequired
};