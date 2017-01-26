import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

import { Link } from 'react-router';

import { connect } from 'react-redux';

class AuthComponent extends Component {
    render() {
        const { errorMessage } = this.props.errorMessage;
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
                    { errorMessage }
                </Col>
            </FormGroup>
        </Form>);
    }
}
AuthComponent.propTypes = {
    errorMessage: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        errorMessage: state.authReducer.errorMessage
    };
}

export default connect(mapStateToProps)(AuthComponent);
