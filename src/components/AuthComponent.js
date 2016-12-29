import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl } from 'react-bootstrap';

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

        if (e.target.value.trim().length > 0) {

            this.props.changeDataAction(fieldName, true);

        }
        else{

            this.props.changeDataAction(fieldName, false);
        }

    }
    render() {

        const { signInButtonTitle, buttonSignInVisible, showSignInInput, signUpButtonTitle, buttonSignUpVisible,
            showSignUpInput, okButtonTitle, okButtonVisible, passwordTitle, showPass, signInEmpty, signUpEmpty,
            passEmpty} = this.props;

        return <div className="authWrapper">
            <Form horizontal>
                <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button className={'signIn ' + (!buttonSignInVisible ? 'none':'')}
                                    onClick={::this.onSignInButtonPress} >{signInButtonTitle}</Button>
                        </Col>
                    <FormGroup className={(!showSignInInput ? 'none':'')} >
                        <Col sm={2}>
                            {signInButtonTitle}
                        </Col>
                        <Col sm={10}>
                            <FormControl className="signInData" type="text" placeholder="signIn"
                                         onChange={this.onFieldChange.bind(this, 'signInEmpty')} />
                        </Col>
                    </FormGroup>

                </FormGroup>
                <FormGroup>
                    <div>
                        <Button className={'signUp ' + (!buttonSignUpVisible ? 'none':'')}
                                onClick={::this.onSignUpButtonPress}>{signUpButtonTitle} </Button>
                        <p className={(!showSignUpInput ? 'none':'')}><label>{signUpButtonTitle}:</label>
                            <input className="signUpData" type="text" onChange={this.onFieldChange.bind(this, 'signUpEmpty')}/></p>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className={'pass ' + (!showPass ? 'none' : '')}>
                        <p><label>{passwordTitle}:</label><input type="password" className="passData"
                                                                 onChange={this.onFieldChange.bind(this, 'passEmpty')}/></p>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Button disabled={signInEmpty || signUpEmpty || passEmpty} onClick={::this.onOkButtonPress}
                            className={'okButton ' + (!okButtonVisible ? 'none' : '')}>{okButtonTitle}</Button>
                </FormGroup>
            </Form>

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