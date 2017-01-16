import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

export default class UserComponent extends Component {

    constructor() {
        super();
        this.state = {showHide: false};
    }
    onLogoutButtonPress(e) {
        e.preventDefault();
        this.props.userExit(this.props.userName, this.props.userAvatar, this.props.userAboutMe, this.props.userAge);
    }
    showHide() {
        this.setState({showHide: !this.state.showHide});
    }
    render() {
        const { userName, userAvatar, userAge, userAboutMe, showUser } = this.props;
        return (<Form horizontal className={(!showUser ? 'userWrapper none' : 'userWrapper')}>
            <FormGroup className='userAvatar'>
                <Col sm={4}>
                    {(userAvatar.length !== 0) ? <img
                        width={128}
                        height={128}
                        role='presentation'
                        src={require(`../pics/${userAvatar}`)} /> : // eslint-disable-line global-require
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
                    {userName}
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'userAge none' : 'userAge')}>
                <Col sm={4}>
                    Age:
                </Col>
                <Col sm={4}>
                    {userAge}
                </Col>
            </FormGroup>
            <FormGroup className={(!this.state.showHide ? 'userAboutMe none' : 'userAboutMe')} >
                <Col sm={4}>
                    About me:
                </Col>
                <Col sm={4}>
                    {userAboutMe}
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

UserComponent.propTypes = {
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    userAge: PropTypes.string.isRequired,
    userAboutMe: PropTypes.string.isRequired,
    showUser: PropTypes.bool.isRequired,
    userExit: PropTypes.func.isRequired
};
