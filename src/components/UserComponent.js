import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col } from 'react-bootstrap';

import avatarBoy from '../pics/avatarBoy.png';
import avatarGirl from '../pics/avatarGirl.png';

export default class UserComponent extends Component {
    onLogoutButtonPress(e) {
        e.preventDefault();
        this.props.userExit(this.props.userName, this.props.userAvatar, this.props.userAboutMe, this.props.userAge);
    }
    showMore() {
        this.props.showMoreAction();
    }
    showLess() {
        this.props.showLessAction();
    }
    render() {
        const { userName, userAvatar, userAge, userAboutMe, showUser, showMore } = this.props;
        return (<Form horizontal className={(!showUser ? 'userWrapper none' : 'userWrapper')}>
            <FormGroup className='userAvatar'>
                <Col sm={4}>
                    {(userAvatar.length !== 0) ? <img role='presentation' src={(userAvatar === 'avatarBoy') ? avatarBoy : avatarGirl} /> : 'no avatar yet'}
                </Col>
            </FormGroup>
            <FormGroup className={(showMore ? 'showMoreButton none' : 'showMoreButton')} onClick={this.showMore.bind(this)}>
                <Col sm={4}>
                    <Button bsStyle='primary'>
                       Show more
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!showMore ? 'showLessButton none' : 'showLessButton')} onClick={this.showLess.bind(this)}>
                <Col sm={4}>
                    <Button bsStyle='primary'>
                        Show less
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={(!showMore ? 'userName none' : 'userName')}>
                <Col sm={4}>
                  Name:
                </Col>
                <Col sm={4}>
                    {userName}
                </Col>
            </FormGroup>
            <FormGroup className={(!showMore ? 'userAge none' : 'userAge')}>
                <Col sm={4}>
                    Age:
                </Col>
                <Col sm={4}>
                    {userAge}
                </Col>
            </FormGroup>
            <FormGroup className={(!showMore ? 'userAboutMe none' : 'userAboutMe')} >
                <Col sm={4}>
                    About me:
                </Col>
                <Col sm={4}>
                    {userAboutMe}
                </Col>
            </FormGroup>
            <FormGroup className={(!showMore ? 'logOutButton none' : 'logOutButton')}>
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
    userExit: PropTypes.func.isRequired,
    showMore: PropTypes.bool.isRequired,
    showMoreAction: PropTypes.func.isRequired,
    showLessAction: PropTypes.func.isRequired
};
