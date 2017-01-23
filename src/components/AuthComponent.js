import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

import { Link } from 'react-router';

export default class AuthComponent extends Component {
    render() {
        const {errorMessage} = this.props;
        return (<Form horizontal className='authWrapper'>
            <FormGroup className='welcomeMessage'>
                <Col sm={4}>
                    <h3>Please select authorisation type</h3>
                </Col>
            </FormGroup>
            <FormGroup className='signIn'>
                <Col sm={3}>
                    <Button block bsStyle='primary'>
                        <Link to='/signin'>Sign in</Link>
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className='signUp'>
                <Col sm={3}>
                    <Button block bsStyle='primary'>
                        <Link to='/signup'>Sign up</Link>
                    </Button>
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
    errorMessage: PropTypes.string.isRequired
};
