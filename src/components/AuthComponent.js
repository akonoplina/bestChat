import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

import SignInFormComponent from '../components/SignInFormComponent';
import SignUpFormComponent from '../components/SignUpFormComponent';

export default class AuthComponent extends Component {
    constructor() {
        super();
        const AUTH_TYPE = '';
        this.state = {AUTH_TYPE};
    }

    onSignInButtonPress() {
        this.setState({AUTH_TYPE: 'signIn'});
    }

    onSignUpButtonPress() {
        this.setState({AUTH_TYPE: 'signUp'});
    }

    render() {
        const {errorMessage} = this.props;
        switch (this.state.AUTH_TYPE) {
            case 'signIn': {
                return (<SignInFormComponent authSendData={this.props.authSendData} />);
            }
            case 'signUp': {
                return (<SignUpFormComponent authSendData={this.props.authSendData} />);
            }
            default: {
                return (<Form horizontal className='authWrapper'>
                    <FormGroup className='welcomeMessage'>
                        <Col sm={4}>
                            <h3>Please select authorisation type</h3>
                        </Col>
                    </FormGroup>
                    <FormGroup className='signIn'>
                        <Col sm={3}>
                            <Button block bsStyle='primary' onClick={this.onSignInButtonPress.bind(this)}>Sign
                                in</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup className='signUp'>
                        <Col sm={3}>
                            <Button block bsStyle='primary' onClick={this.onSignUpButtonPress.bind(this)}>Sign
                                up</Button>
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
    }
}
AuthComponent.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    authSendData: PropTypes.func.isRequired
};
