import React, { Component, PropTypes } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { browserHistory } from 'react-router';

import { authSendData, clearErrorMessage } from '../../actions/authActions';

import { socketsConnect } from '../../actions/socketActions';

class SignInFormComponent extends Component {
    constructor() {
        super();
        this.state = {
            buttonDisabled: true,
            validationStateSignIn: null,
            validationStatePass: null
        };
    }
    componentWillMount() {
        /* global localStorage*/

        const userObj = JSON.parse(localStorage.getItem('userObj'));
        const connected = localStorage.getItem('connected');
        if (userObj && connected) {
            browserHistory.push('/chat');
        }
    }
    componentWillUnmount() {
        const clearErrorMessage = this.props.clearErrorMessage;
        clearErrorMessage();
    }
    onOkButtonPress() {
        const socketsConnect = this.props.socketsConnect;
        const authSendData = this.props.authSendData;

        /* global document*/

        const userPass = document.getElementsByClassName('passDataIn')[0].value;
        const userLogin = document.getElementsByClassName('signInData')[0].value;
        const authType = 'signIn';

        socketsConnect();

        authSendData(userLogin, userPass, authType); // sends data to websocket server, sets jwt
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
        const errorMessage = this.props.errorMessage;
        return (<Form horizontal className='signInForm'>
            <FormGroup className='instructionMessage'>
                <Col>
                    <h3>Please enter your login & pass)))</h3>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStateSignIn}>
                <Col componentClass={ControlLabel}>
                    Login*:
                </Col>
                <Col className='signInBlock'>
                    <FormControl className='signInData' type='text' onChange={this.validateAction.bind(this, 'signIn')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStatePass}>
                <Col componentClass={ControlLabel}>
                    Password*:
                </Col>
                <Col className='passBlock'>
                    <FormControl type='password' className='passDataIn' onChange={this.validateAction.bind(this, 'pass')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup className='okButton'>
                <Col>
                    <Button
                        bsStyle='primary'
                        disabled={!(this.state.validationStatePass === 'success' && this.state.validationStateSignIn
                        === 'success')}
                        onClick={this.onOkButtonPress.bind(this)} >
                        Ok
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!errorMessage ? 'errorMessageBlock none' : 'errorMessageBlock')}>
                <Col>
                    { errorMessage }
                </Col>
            </FormGroup>
        </Form>);
    }
}

SignInFormComponent.propTypes = {
    socketsConnect: PropTypes.func.isRequired,
    authSendData: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        errorMessage: state.authReducer.errorMessage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        socketsConnect: bindActionCreators(socketsConnect, dispatch),
        authSendData: bindActionCreators(authSendData, dispatch),
        clearErrorMessage: bindActionCreators(clearErrorMessage, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormComponent);
