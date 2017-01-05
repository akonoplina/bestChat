import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

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

        if(userSignIn !== ''){
            userLogin = userSignIn;
            authType = 'signIn';
        }
        else{
            userLogin = userSignUp;
            authType = 'signUp';
        }

        this.props.socketsConnect(); // websockets action

        this.props.authSendData(userLogin, userPass, authType); // websockets action calls loginAction

        ReactDOM.findDOMNode(this.refs.signIn).value = '';
        ReactDOM.findDOMNode(this.refs.signUp).value = '';
        ReactDOM.findDOMNode(this.refs.pass).value = '';

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
        else if(validationResult === 'error'){
            this.props.changeDataAction(fieldName, false, validationResult);
        }
        else{
            this.props.changeDataAction(fieldName, true, validationResult);
        }

    }
    render() {

        const { signInButtonTitle, buttonSignInVisible, showSignInInput, signUpButtonTitle, buttonSignUpVisible,
            showSignUpInput, okButtonTitle, okButtonVisible, passwordTitle, showPass, validationStateSignIn,
            validationStateSignUp, validationStatePass, buttonDisabled, errorMessage, showAuthWrapper} = this.props;

        return <Form horizontal className={'authWrapper ' + (!showAuthWrapper ? 'none':'')}>
                <FormGroup className="instructionMessage">
                    <Col sm={3}>
                        <h3>Please enter your login & pass)))</h3>
                    </Col>
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
                        <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6.</HelpBlock>
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
                        <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6</HelpBlock>
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
                        <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
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
    okButtonVisible: PropTypes.bool.isRequired,
    passwordTitle: PropTypes.string.isRequired,
    showPass: PropTypes.bool.isRequired,
    changeDataAction: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    socketsDisconnect: PropTypes.func.isRequired,
    authSendData: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    showAuthWrapper: PropTypes.bool.isRequired
};