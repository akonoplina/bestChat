import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

import SignInFormComponent from '../components/SignInFormComponent';
import SignUpFormComponent from '../components/SignUpFormComponent';

export default class AuthComponent extends Component {
    componentWillMount() {
        this.state = {signIn: false, signUp: false, showAuthWrapper: true};
    }
    onSignInButtonPress() {
        this.setState({signIn: true});
    }
    onSignUpButtonPress() {
        this.setState({signUp: true});
    }
    render() {
        const {errorMessage} = this.props;
        if (this.state.signIn) {
            return (<SignInFormComponent socketsConnect={this.props.socketsConnect} authSendData={this.props.authSendData} />);
        } else if (this.state.signUp) {
            return (<SignUpFormComponent socketsConnect={this.props.socketsConnect} authSendData={this.props.authSendData} />);
        }
        return (<Form horizontal className={(!this.state.showAuthWrapper ? 'authWrapper none' : 'authWrapper')}>
            <FormGroup className='welcomeMessage'>
                <Col sm={4}>
                    <h3>Please select authorisation type</h3>
                </Col>
            </FormGroup>
            <FormGroup className='signIn'>
                <Col sm={3}>
                    <Button block bsStyle='primary' onClick={this.onSignInButtonPress.bind(this)} >Sign in</Button>
                </Col>
            </FormGroup>
            <FormGroup className='signUp'>
                <Col sm={3}>
                    <Button block bsStyle='primary' onClick={this.onSignUpButtonPress.bind(this)}>Sign up</Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!errorMessage ? 'errorMessageBlock none' : 'errorMessageBlock')}>
                <Col sm={3}>
                    {errorMessage}
                </Col>
            </FormGroup>
        </Form>);
    }
}

AuthComponent.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    authSendData: PropTypes.func.isRequired
};
