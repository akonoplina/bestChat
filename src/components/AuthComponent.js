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
    onFieldChange(fieldName, e){

        if (e.target.value.trim().length > 0) {

            this.props.changeDataAction(fieldName, true);

        }
        else{

            this.props.changeDataAction(fieldName, false);
        }

        //this.props.validateAction();

    }
    render() {

        const { signInButtonTitle, buttonSignInVisible, showSignInInput, signUpButtonTitle, buttonSignUpVisible,
            showSignUpInput, okButtonTitle, okButtonVisible, passwordTitle, showPass, signInEmpty, signUpEmpty,
            passEmpty} = this.props;

        return <div className="authWrapper">
            <div>
                <button className={'signIn ' + (!buttonSignInVisible ? 'none':'')}
                        onClick={::this.onSignInButtonPress} >{signInButtonTitle}</button>
                <p className={(!showSignInInput ? 'none':'')}><label>{signInButtonTitle}:</label>
                    <input className="signInData" type="text" onChange={this.onFieldChange.bind(this, 'signInEmpty')}/></p>
            </div>
            <div>
                <button className={'signUp ' + (!buttonSignUpVisible ? 'none':'')}
                        onClick={::this.onSignUpButtonPress}>{signUpButtonTitle}</button>
                <p className={(!showSignUpInput ? 'none':'')}><label>{signUpButtonTitle}:</label>
                    <input className="signUpData" type="text" onChange={this.onFieldChange.bind(this, 'signUpEmpty')}/></p>
            </div>
            <div className={'pass ' + (!showPass ? 'none' : '')}>
                <p><label>{passwordTitle}:</label><input type="password" className="passData"
                                                         onChange={this.onFieldChange.bind(this, 'passEmpty')}/></p>
            </div>
            <button disabled={signInEmpty || signUpEmpty || passEmpty} onClick={::this.onOkButtonPress}
                    className={'okButton ' + (!okButtonVisible ? 'none' : '')}>{okButtonTitle}</button>

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
    showPass: PropTypes.bool.isRequired,
    changeDataAction: PropTypes.func.isRequired,
    signInEmpty: PropTypes.bool.isRequired,
    signUpEmpty: PropTypes.bool.isRequired,
    passEmpty: PropTypes.bool.isRequired
};