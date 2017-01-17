import React, { Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

export default class UserComponent extends Component {

    constructor() {
        super();
        /* global localStorage*/
        const jwt = localStorage.getItem('jwt'); // decipher it into userObj... maybe even include connected, think about it later
        const connected = localStorage.getItem('connected');
        this.state = {
            showHide: false,
            connected,
            jwt,
            userName: jwt.userName,
            userAge: jwt.userAge,
            userAvatar: jwt.userAvatar,
            userAboutMe: jwt.userAboutMe };
    }
    onLogoutButtonPress(e) {
        e.preventDefault();
        this.props.userExit(this.state.userName, this.state.userAvatar, this.state.userAboutMe, this.state.userAge);
    }
    showHide() {
        this.setState({showHide: !this.state.showHide});
    }
    render() {
        return (<Form horizontal className={((!this.state.connected && !this.state.jwt) ? 'userWrapper none' : 'userWrapper')}>
            <FormGroup className='userAvatar'>
                <Col sm={4}>
                    {(this.state.userAvatar.length !== 0) ? <img
                        width={128}
                        height={128}
                        role='presentation'
                        src={require(`../pics/${this.state.userAvatar}`)} /> : // eslint-disable-line global-require
                        'no avatar yet'}
                </Col>
            </FormGroup>
            <FormGroup className={(this.state.showHide ? 'showHideButton none' : 'showHideButton')} onClick={this.showHide.bind(this)}>
                <Col sm={4}>
                    <Button bsStyle='primary'>
                       Show more
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'showLessButton none' : 'showLessButton')} onClick={this.showHide.bind(this)}>
                <Col sm={4}>
                    <Button bsStyle='primary'>
                        Show less
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'userName none' : 'userName')}>
                <Col sm={4}>
                  Name:
                </Col>
                <Col sm={4}>
                    {this.state.userName}
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'userAge none' : 'userAge')}>
                <Col sm={4}>
                    Age:
                </Col>
                <Col sm={4}>
                    {this.state.userAge}
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'userAboutMe none' : 'userAboutMe')} >
                <Col sm={4}>
                    About me:
                </Col>
                <Col sm={4}>
                    {this.state.userAboutMe}
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'logOutButton none' : 'logOutButton')}>
                <Col sm={1}>
                    <Button bsStyle='primary' onClick={this.onLogoutButtonPress.bind(this)}>
                         Logout
                    </Button>
                </Col>
            </FormGroup>
        </Form>);
    }
}
