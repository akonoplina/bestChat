import React, { Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

import { Link } from 'react-router';

import { connect } from 'react-redux';

class AuthComponent extends Component {
    render() {
        return (<Form horizontal className='authWrapper'>
            <FormGroup className='welcomeMessage'>
                <Col>
                    <h3>Please select authorisation type</h3>
                </Col>
            </FormGroup>
            <FormGroup className='signIn'>
                <Col>
                    <Button block bsStyle='primary'>
                        <Link to='/signin'>Sign in</Link>
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className='signUp'>
                <Col>
                    <Button block bsStyle='primary'>
                        <Link to='/signup'>Sign up</Link>
                    </Button>
                </Col>
            </FormGroup>
        </Form>);
    }
}

export default connect()(AuthComponent);
