import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class AuthComponent extends Component {
    static validateAction(fieldName, value) {
        if (!value) {
            return null;
        }
        switch (fieldName) {
            case 'pass': {
                const ckPassword = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
                if (!ckPassword.test(value)) {
                    return 'error';
                }
                return 'success';
            }
            default: {
                const ckUsername = /^[A-Za-z0-9_]{6,}$/;
                if (!ckUsername.test(value)) {
                    return 'error';
                }
                return 'success';
            }
        }
    }
    onFieldChange(fieldName, e) {
        const validationResult = this.validateAction(fieldName, e.target.value);
        if (validationResult === 'success') {
            this.props.changeDataAction(fieldName, true, validationResult);
        } else if (validationResult === 'error') {
            this.props.changeDataAction(fieldName, false, validationResult);
        } else {
            this.props.changeDataAction(fieldName, true, validationResult);
        }
    }
    onSignInButtonPress() {
        this.props.signInAction();
    }
    onSignUpButtonPress() {
        this.props.signUpAction();
    }
    onOkButtonPress() {
        const userSignIn = this.signIn.value;

        const userSignUp = this.signUp.value;

        let userLogin = '';
        let authType = '';
        const userPass = this.pass.value;

        if (userSignIn !== '') {
            userLogin = userSignIn;
            authType = 'signIn';
        } else {
            userLogin = userSignUp;
            authType = 'signUp';
        }

        this.props.socketsConnect(); // websockets action

        this.props.authSendData(userLogin, userPass, authType); // websockets action calls loginAction

        this.signIn.value = '';
        this.signUp.value = '';
        this.pass.value = '';

        const el = {target: {value: null}};

        this.onFieldChange('signIn', el);
        this.onFieldChange('signUp', el);
        this.onFieldChange('pass', el);
    }
    render() {
        const { signInButtonTitle, buttonSignInVisible, showSignInInput, signUpButtonTitle, buttonSignUpVisible,
            showSignUpInput, okButtonTitle, okButtonVisible, passwordTitle, showPass, validationStateSignIn,
            validationStateSignUp, validationStatePass, buttonDisabled, errorMessage, showAuthWrapper} = this.props;

        return (<Form horizontal className={(!showAuthWrapper ? 'authWrapper none' : 'authWrapper')}>
            <FormGroup className='instructionMessage'>
                <Col sm={3}>
                    <h3>Please enter your login & pass)))</h3>
                </Col>
            </FormGroup>
            <FormGroup className={(!buttonSignInVisible ? 'signIn none' : 'signIn')}>
                <Col sm={1}>
                    <Button block bsStyle='primary' onClick={this.onSignInButtonPress.bind(this)} >{signInButtonTitle}</Button>
                </Col>
            </FormGroup>
            <FormGroup validationState={validationStateSignIn} className={(!showSignInInput ? 'none' : '')}>
                <Col componentClass={ControlLabel} sm={1}>
                    {signInButtonTitle}:
                </Col>
                <Col sm={2}>
                    <FormControl
                        className='signInData'
                        type='text'
                        ref={(c) => { this.signIn = c; }}
                        onChange={this.onFieldChange.bind(this, 'signIn')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup className={(!buttonSignUpVisible ? 'signUp none' : 'signUp')}>
                <Col sm={1}>
                    <Button block bsStyle='primary' onClick={this.onSignUpButtonPress.bind(this)}>{signUpButtonTitle}</Button>
                </Col>
            </FormGroup>
            <FormGroup validationState={validationStateSignUp} className={(!showSignUpInput ? 'none' : '')}>
                <Col componentClass={ControlLabel} sm={1}>
                    {signUpButtonTitle}:
                </Col>
                <Col sm={2}>
                    <FormControl
                        className='signUpData'
                        type='text'
                        ref={(c) => { this.signUp = c; }}
                        onChange={this.onFieldChange.bind(this, 'signUp')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup validationState={validationStatePass} className={(!showPass ? 'pass none' : 'pass')}>
                <Col componentClass={ControlLabel} sm={1}>
                    {passwordTitle}:
                </Col>
                <Col sm={2}>
                    <FormControl
                        type='password'
                        className='passData'
                        ref={(c) => { this.pass = c; }}
                        onChange={this.onFieldChange.bind(this, 'pass')}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup className={(!okButtonVisible ? 'okButton none' : 'okButton')}>
                <Col sm={1}>
                    <Button
                        bsStyle='primary'
                        disabled={buttonDisabled}
                        onClick={this.onOkButtonPress.bind(this)}
                    >
                        {okButtonTitle}
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!errorMessage ? 'errorMessageBlock none' : 'errorMessageBlock')}>
                <Col sm={1}>
                    {errorMessage}
                </Col>
            </FormGroup>
        </Form>);
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
    authSendData: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    showAuthWrapper: PropTypes.bool.isRequired
};
