import React, { Component, PropTypes } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { browserHistory } from 'react-router';

import { authSendData } from '../../actions/authActions';

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
    onOkButtonPress() {
        const socketsConnect = this.props.socketsConnect;
        const authSendData = this.props.authSendData;
        const userLoggedIn = this.props.userLoggedIn;
        const errorMessage = this.props.errorMessage;

        /* global document*/

        const userPass = document.getElementsByClassName('passDataIn')[0].value;
        const userLogin = document.getElementsByClassName('signInData')[0].value;
        const authType = 'signIn';

        socketsConnect();

        authSendData(userLogin, userPass, authType); // sends data to websocket server, sets jwt

        document.getElementsByClassName('signInData')[0].value = '';
        document.getElementsByClassName('passDataIn')[0].value = '';

        const el = {target: {value: null}};

        this.validateAction('all', el);
        if (!errorMessage && userLoggedIn) {
            browserHistory.push('/chat');
        }
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
                <Col sm={5}>
                    <h3>Please enter your login & pass)))</h3>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStateSignIn}>
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
                    <FormControl type='password' className='passDataIn' onChange={this.validateAction.bind(this, 'pass')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
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
            <FormGroup className={(!errorMessage ? 'errorMessageBlock none' : 'errorMessageBlock')}>
                <Col sm={3}>
                    { errorMessage }
                </Col>
            </FormGroup>
        </Form>);
    }
}

SignInFormComponent.propTypes = {
    socketsConnect: PropTypes.func.isRequired,
    authSendData: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    userLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        errorMessage: state.authReducer.errorMessage,
        userLoggedIn: state.authReducer.userLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        socketsConnect: bindActionCreators(socketsConnect, dispatch),
        authSendData: bindActionCreators(authSendData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormComponent);
