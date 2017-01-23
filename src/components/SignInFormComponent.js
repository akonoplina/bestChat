import React, { Component, PropTypes } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class SignInFormComponent extends Component {
    constructor() {
        super();
        this.state = {
            buttonDisabled: true,
            validationStateSignUp: null,
            validationStatePass: null,
            showSignUp: true
        };
    }
    onOkButtonPress() {
        const userPass = document.getElementsByClassName('passDataUp')[0].value; /* global document*/
        const userLogin = document.getElementsByClassName('signInData')[0].value; /* global document*/
        const authType = 'signIn';

        this.props.authSendData(userLogin, userPass, authType); // sends data to websocket server, sets jwt

        this.setState({showSignUp: false});

        document.getElementsByClassName('signInData')[0].value = ''; /* global document*/
        document.getElementsByClassName('passDataUp')[0].value = ''; /* global document*/

        const el = {target: {value: null}};

        this.validateAction('all', el);
    }
    validateAction(fieldName, e) {
        if (fieldName === 'all' && !e.target.value) {
            this.setState({validationStatePass: null, validationStateSignUp: null});
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
                    this.setState({validationStateSignUp: 'error'});
                } else {
                    this.setState({validationStateSignUp: 'success'});
                }
                break;
            }
        }
    }
    render() {
        return (<Form horizontal className={!(this.state.showSignUp) ? 'signInForm none' : 'signInForm'}>
            <FormGroup className='instructionMessage'>
                <Col sm={5}>
                    <h3>Please enter your login & pass)))</h3>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStateSignUp}>
                <Col componentClass={ControlLabel} sm={1}>
                    Login*:
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
                    <FormControl type='password' className='passDataUp' onChange={this.validateAction.bind(this, 'pass')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup className='okButton'>
                <Col sm={1}>
                    <Button
                        bsStyle='primary'
                        disabled={!(this.state.validationStatePass === 'success' && this.state.validationStateSignUp
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
    authSendData: PropTypes.func.isRequired
};
