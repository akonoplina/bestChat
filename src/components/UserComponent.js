import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col} from 'react-bootstrap';

export default class UserComponent extends Component {
    onLogoutButtonPress(e) {
        e.preventDefault();
        this.props.userExit( this.props.userName, this.props.userAvatar, this.props.userAboutMe, this.props.userAge);
    }
    showMore() {
        this.props.showMoreAction();
    }
    showLess(){
        this.props.showLessAction();
    }
    render() {
        const { userName, userAvatar, userAge, userAboutMe, showUser, showMore } = this.props;
        return <Form horizontal className={'userWrapper '+ (!showUser ? 'none': '')}>
            <FormGroup className="userAvatar">
                <Col sm={4}>
                    {(userAvatar.length !== 0) ? <img src = { require("../pics/" + userAvatar + ".png")} /> : 'no avatar yet'}
                </Col>
            </FormGroup>
            <FormGroup className={'showMoreButton ' + (showMore? 'none': '')} onClick={::this.showMore}>
                <Col sm={4}>
                    <Button bsStyle="primary">
                        Show more
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={'showLessButton ' + (!showMore? 'none': '')} onClick={::this.showLess}>
                <Col sm={4}>
                    <Button bsStyle="primary">
                        Show less
                    </Button>
                </Col>
            </FormGroup>
            <FormGroup className={'userName ' + (!showMore? 'none':'')}>
                <Col sm={4}>
                    Name:
                </Col>
                <Col sm={4}>
                    {userName}
                </Col>
            </FormGroup>
            <FormGroup className={'userAge ' + (!showMore? 'none':'')}>
                <Col sm={4}>
                    Age:
                </Col>
                <Col sm={4}>
                    {userAge}
                </Col>
            </FormGroup>
            <FormGroup className={'userAboutMe ' + (!showMore? 'none':'')} >
                <Col sm={4}>
                    About me:
                </Col>
                <Col sm={4}>
                    {userAboutMe}
                </Col>
            </FormGroup>
            <FormGroup className={'logOutButton ' + (!showMore? 'none':'')}>
                <Col sm={1}>
                    <Button bsStyle="primary" onClick={::this.onLogoutButtonPress}>
                        Logout
                    </Button>
                </Col>
            </FormGroup>
        </Form>
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