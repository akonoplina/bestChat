import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export default class AuthComponent extends Component {

    onSignInButtonPress(){

        this.props.signInAction();

    }
    onSignUpButtonPress(){

        this.props.signUpAction();

    }
    onOkButtonPress(){

        this.props.OkButtonAction();
        //this.props.validateAction();

    }
    onFieldChange(fieldName, e){

        let length = e.target.value.trim().length;
        if (length > 0) {
            if (length > 10)
                this.props.changeDataAction(fieldName, true, 'success');
            else if (length > 5)
                this.props.changeDataAction(fieldName, true, 'warning');
            else if (length > 0)
                this.props.changeDataAction(fieldName, true, 'error');

        }
        else{
            this.props.changeDataAction(fieldName, false);
        }

    }
    render() {

        const { signInButtonTitle, buttonSignInVisible, showSignInInput, signUpButtonTitle, buttonSignUpVisible,
            showSignUpInput, okButtonTitle, okButtonVisible, passwordTitle, showPass, signInEmpty, signUpEmpty,
            passEmpty, validationStateSignIn, validationStateSignUp, validationStatePass } = this.props;

        return <Form horizontal className="authWrapper">
                <FormGroup>
                    <h3>Welcome to the chat!!!</h3>
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
                    <FormControl className="signInData" type="text"
                                 onChange={this.onFieldChange.bind(this, 'signInEmpty')} />
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
                       <FormControl className="signUpData" type="text"
                                    onChange={this.onFieldChange.bind(this, 'signUpEmpty')} />
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup validationState={validationStatePass} className={'pass ' + (!showPass ? 'none' : '')}>
                    <Col componentClass={ControlLabel} sm={1}>
                        {passwordTitle}:
                    </Col>
                    <Col sm={2}>
                        <FormControl type="password" className="passData"
                                     onChange={this.onFieldChange.bind(this, 'passEmpty')}/>
                    <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup className={'okButton ' + (!okButtonVisible ? 'none' : '')}>
                    <Col sm={1}>
                        <Button bsStyle="primary" disabled={signInEmpty || signUpEmpty || passEmpty}
                            onClick={::this.onOkButtonPress}>{okButtonTitle}</Button>
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
    signInEmpty: PropTypes.bool.isRequired,
    signUpEmpty: PropTypes.bool.isRequired,
    passEmpty: PropTypes.bool.isRequired
};