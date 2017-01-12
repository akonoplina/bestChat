import React, { Component, PropTypes } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class SignInFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            validationStateSignIn: null,
            validationStatePass: null,
            showSignIn: true
        };
    }
    onOkButtonPress() {
        const userPass = document.getElementsByClassName('passDataIn')[0].value; /* global document*/
        const userLogin = document.getElementsByClassName('signInData')[0].value; /* global document*/
        const userNameData = document.getElementsByClassName('userNameData')[0].value; /* global document*/
        const userAgeData = document.getElementsByClassName('userAgeData')[0].value; /* global document*/
        const userAvatarData = document.getElementsByClassName('userAvatarData')[0].files[0]; /* global document*/
        const userAboutMeData = document.getElementsByClassName('userAboutMeData')[0].value; /* global document*/
        const authType = 'signIn';

        const reader = new FileReader(); /* global FileReader*/
        let userAvatarDataText = '';
        reader.onload = () => {
            userAvatarDataText = reader.result;
            this.props.socketsConnect(); // websockets action

            this.props.authSendData(userLogin, userPass, authType, userNameData, userAgeData, userAvatarDataText, userAboutMeData); // websockets action calls loginAction
            this.setState({showSignIn: false});

            document.getElementsByClassName('signInData')[0].value = ''; /* global document*/
            document.getElementsByClassName('passDataIn')[0].value = ''; /* global document*/

            const el = {target: {value: null}};

            this.validateAction('all', el);
        };
        reader.readAsText(userAvatarData);
    }
    validateAction(fieldName, e) {
        if (fieldName === 'all' && !e.target.value) {
            this.setState({validationStatePass: null, validationStateSignIn: null});
        }
        switch (fieldName) {
            case 'pass': {
                const ckPassword = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
                if (!ckPassword.test(e.target.value)) {
                    this.setState({validationStatePass: 'error'});
                } else {
                    this.setState({validationStatePass: 'success'});
                }
                break;
            }
            case 'signIn': {
                const ckUsername = /^[A-Za-z0-9_]{6,}$/;
                if (!ckUsername.test(e.target.value)) {
                    this.setState({validationStateSignIn: 'error'});
                } else {
                    this.setState({validationStateSignIn: 'success'});
                }
                break;
            }
        }
    }
    render() {
        return (<Form horizontal className={!(this.state.showSignIn) ? 'signInForm none' : 'signInForm'}>
            <FormGroup className='instructionMessage'>
                <Col sm={5}>
                    <h3>Please enter your login & pass)))</h3>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStateSignIn}>
                <Col componentClass={ControlLabel} sm={1}>
                    Sign in*:
                </Col>
                <Col sm={3}>
                    <FormControl className='signInData' type='text' onChange={this.validateAction.bind(this, 'signIn')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStatePass}>
                <Col componentClass={ControlLabel} sm={1}>
                    Password*:
                </Col>
                <Col sm={3}>
                    <FormControl type='password' className='passDataIn' onChange={this.validateAction.bind(this, 'pass')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                    Name:
                </Col>
                <Col sm={3}>
                    <FormControl type='text' className='userNameData' />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                    Age:
                </Col>
                <Col sm={3}>
                    <FormControl type='text' className='userAgeData' />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                    About me:
                </Col>
                <Col sm={3}>
                    <FormControl type='text' className='userAboutMeData' />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                    Avatar:
                </Col>
                <Col sm={3}>
                    <FormControl type='file' className='userAvatarData' />
                </Col>
            </FormGroup>
            <FormGroup className='okButton'>
                <Col sm={1}>
                    <Button
                        bsStyle='primary'
                        disabled={!(this.state.validationStatePass === 'success' && this.state.validationStateSignIn
                        === 'success')}
                        onClick={this.onOkButtonPress.bind(this)} >
                        Ok
                    </Button>
                </Col>
            </FormGroup>
        </Form>);
    }
}

SignInFormComponent.propTypes = {
    socketsConnect: PropTypes.func.isRequired,
    authSendData: PropTypes.func.isRequired
};
