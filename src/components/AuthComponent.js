import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

import ReactDOM from 'react-dom';

export default class AuthComponent extends Component {

    onSignInButtonPress(){

        this.props.signInAction();

    }
    onSignUpButtonPress(){

        this.props.signUpAction();

    }
    onOkButtonPress(){

        let userSignIn = ReactDOM.findDOMNode(this.refs.signIn).value;

        let userSignUp = ReactDOM.findDOMNode(this.refs.signUp).value;

        let userLogin, authType = '';
        let userPass = ReactDOM.findDOMNode(this.refs.pass).value;

        if(userSignIn !== 'undefined'){
            userLogin = userSignIn;
            authType = 'signIn';
        }
        else{
            userLogin = userSignUp;
            authType = 'signUp';
        }

        this.props.socketsConnect(); // websockets action
        console.log(this.props);
        this.props.authSendData(userLogin, userPass, authType); // websockets action
        //this.props.OkButtonAction();


    }
    validateAction(fieldName,value){
        switch (fieldName){
            case 'pass':
                let ckPassword = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
                if(!ckPassword.test(value)){
                    return 'error';
                }
                return 'success';
            default:
                let ckUsername = /^[A-Za-z0-9_]{6,}$/;
                if(!ckUsername.test(value)){
                    return 'error';
                }
                return 'success';

        }
    }
    onFieldChange(fieldName, e){

        let validationResult = this.validateAction(fieldName, e.target.value);
        if (validationResult === 'success') {
            this.props.changeDataAction(fieldName, true, validationResult);
        }
        else{
            this.props.changeDataAction(fieldName, false, validationResult);
        }

    }
    render() {

        const { signInButtonTitle, buttonSignInVisible, showSignInInput, signUpButtonTitle, buttonSignUpVisible,
            showSignUpInput, okButtonTitle, okButtonVisible, passwordTitle, showPass, validationStateSignIn,
            validationStateSignUp, validationStatePass, buttonDisabled, errorMessage} = this.props;

        return <Form horizontal className="authWrapper">
                <FormGroup>
                    <h3>Please enter your login & pass)))</h3>
                </FormGroup>
                <FormGroup className={'signIn ' + (!buttonSignInVisible ? 'none':'')}>
                    <Col sm={1}>
                    <Button block bsStyle="primary" onClick={::this.onSignInButtonPress} >{signInButtonTitle}</Button>
                    </Col>
                </FormGroup>
                <FormGroup validationState={validationStateSignIn} className={(!showSignInInput ? 'none':'')}>
                    <Col componentClass={ControlLabel} sm={1}>
                        {signInButtonTitle}:
                    </Col>
                    <Col sm={2}>
                    <FormControl className="signInData" type="text" ref="signIn"
                                 onChange={this.onFieldChange.bind(this, 'signIn')} />
                    <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup className={'signUp ' + (!buttonSignUpVisible ? 'none':'')}>
                    <Col sm={1}>
                        <Button block bsStyle="primary" onClick={::this.onSignUpButtonPress}>{signUpButtonTitle}</Button>
                    </Col>
                </FormGroup>
                <FormGroup validationState={validationStateSignUp} className={(!showSignUpInput ? 'none':'')}>
                    <Col componentClass={ControlLabel} sm={1}>
                        {signUpButtonTitle}:
                    </Col>
                    <Col sm={2}>
                       <FormControl className="signUpData" type="text" ref="signUp"
                                    onChange={this.onFieldChange.bind(this, 'signUp')} />
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup validationState={validationStatePass} className={'pass ' + (!showPass ? 'none' : '')}>
                    <Col componentClass={ControlLabel} sm={1}>
                        {passwordTitle}:
                    </Col>
                    <Col sm={2}>
                        <FormControl type="password" className="passData" ref="pass"
                                     onChange={this.onFieldChange.bind(this, 'pass')}/>
                    <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup className={'okButton ' + (!okButtonVisible ? 'none' : '')}>
                    <Col sm={1}>
                        <Button bsStyle="primary" disabled={buttonDisabled}
                            onClick={::this.onOkButtonPress}>{okButtonTitle}</Button>
                    </Col>
                </FormGroup>
                <FormGroup className={'errorMessageBlock ' + (!errorMessage? 'none' : '')}>
                    <Col sm={1}>
                        {errorMessage}
                    </Col>
                </FormGroup>
            </Form>
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
    buttonDisabled: PropTypes.bool.isRequired,
    userLogin: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    socketsDisconnect: PropTypes.func.isRequired,
    socketsConnecting: PropTypes.func.isRequired,
    socketsDisconnecting: PropTypes.func.isRequired,
    authSendData: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
};