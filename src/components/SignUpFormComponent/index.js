import React, { Component, PropTypes } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { browserHistory } from 'react-router';

import { authSendData, clearErrorMessage } from '../../actions/authActions';

import { socketsConnect } from '../../actions/socketActions';

class SignUpFormComponent extends Component {
    constructor() {
        super();
        this.state = {
            buttonDisabled: true,
            validationStateSignUp: null,
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

        const userPass = document.getElementsByClassName('passDataUp')[0].value;
        const userLogin = document.getElementsByClassName('signUpData')[0].value;
        const userNameData = document.getElementsByClassName('userNameData')[0].value;
        const userAgeData = document.getElementsByClassName('userAgeData')[0].value;
        const userAvatarData = document.getElementsByClassName('userAvatarData')[0].files[0];
        const userAboutMeData = document.getElementsByClassName('userAboutMeData')[0].value;
        const authType = 'signUp';

        const imageName = userAvatarData.name;

        const reader = new FileReader(); /* global FileReader*/
        let userAvatarDataText = '';
        reader.onload = () => {
            userAvatarDataText = reader.result;

            socketsConnect();
            authSendData(userLogin, userPass, authType, userNameData, userAgeData,
                `${imageName}:${userAvatarDataText}`, userAboutMeData); // sends data to websocket server, sets jwt
        };
        reader.readAsDataURL(userAvatarData);
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
            case 'signUp': {
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
        const errorMessage = this.props.errorMessage;
        return (<Form horizontal className='signUpForm'>
            <FormGroup className='instructionMessage'>
                <Col>
                    <h3>Please enter your login & pass</h3>
                </Col>
            </FormGroup>
            <FormGroup className={(!errorMessage ? 'errorMessageBlock none' : 'errorMessageBlock')}>
                <Col>
                    { errorMessage }
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStateSignUp}>
                <Col componentClass={ControlLabel}>
                    Login*:
                </Col>
                <Col className='signUpBlock'>
                    <FormControl className='signUpData' type='text' onChange={this.validateAction.bind(this, 'signUp')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9 and _ signs. The length should be at least 6.</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup validationState={this.state.validationStatePass}>
                <Col componentClass={ControlLabel}>
                    Password*:
                </Col>
                <Col className='passBlock'>
                    <FormControl type='password' className='passDataUp' onChange={this.validateAction.bind(this, 'pass')} />
                    <FormControl.Feedback />
                    <HelpBlock>You can only use a-Z, 0-9, _, !, @, #, $, %, ^, &, *, () signs. The length should be at least 6</HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel}>
                    Name:
                </Col>
                <Col className='nameBlock'>
                    <FormControl type='text' className='userNameData' />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel}>
                    Age:
                </Col>
                <Col className='ageBlock'>
                    <FormControl type='text' className='userAgeData' />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel}>
                    About me:
                </Col>
                <Col className='aboutMeBlock'>
                    <FormControl type='text' className='userAboutMeData' />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel}>
                    Avatar:
                </Col>
                <Col className='avatarBlock'>
                    <FormControl type='file' className='userAvatarData' />
                </Col>
            </FormGroup>
            <FormGroup className='okButton'>
                <Col>
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

SignUpFormComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormComponent);
