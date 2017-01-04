import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export default class UserComponent extends Component {
    onLogoutButtonPress() {
        this.props.userExit( this.props.userName, this.props.userAvatar, this.props.userAboutMe, this.props.userAge);
    }
    render() {
        const { userName, userAvatar, userAge, userAboutMe, showUser } = this.props;
        return <Form horizontal className={'userWrapper '+ (!showUser ? 'none': '')}>
            <FormGroup className="userName">
                <Col sm={1}>
                    {userName}
                </Col>
            </FormGroup>
            <FormGroup className="userAvatar">
                <Col sm={4}>
                    {(userAvatar.length !== 0) ? <img src ={ require("../pics/" + userAvatar + ".png")} /> : 'no avatar yet'}
                </Col>
            </FormGroup>
            <FormGroup className="userAge">
                <Col sm={4}>
                    Age:
                </Col>
                <Col sm={4}>
                    {userAge}
                </Col>
            </FormGroup>
            <FormGroup className="userAboutMe">
                <Col sm={4}>
                    About me:
                </Col>
                <Col sm={4}>
                    {userAboutMe}
                </Col>
            </FormGroup>
            <FormGroup className="logOutButton">
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
    userExit: PropTypes.func.isRequired
};
//somewhere should be password