import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export default class UserComponent extends Component {
    onLogoutButtonPress(e) {
        e.preventDefault();
        this.props.userExit( this.props.userName, this.props.userAvatar, this.props.userAboutMe, this.props.userAge);
    }
    showMoreAction() {
        // set showMore to true
        this.setState({showMore11: true});
        //this.setState({showMore: false});
    }
    render() {
        const { userName, userAvatar, userAge, userAboutMe, showUser, showMore } = this.props;
        return <Form horizontal className={'userWrapper '+ (!showUser ? 'none': '')}>
            <FormGroup onClick={::this.showMoreAction} className="userAvatar">
                <Col sm={4}>
                    {(userAvatar.length !== 0) ? <img src ={ require("../pics/" + userAvatar + ".png")} /> : 'no avatar yet'}
                </Col>
            </FormGroup>
            <FormGroup className={'userName ' + (!showMore11? 'none':'')}>
                <Col sm={4}>
                    Name:
                </Col>
                <Col sm={4}>
                    {userName}
                </Col>
            </FormGroup>
            <FormGroup className={'userAge ' + (!showMore11? 'none':'')}>
                <Col sm={4}>
                    Age:
                </Col>
                <Col sm={4}>
                    {userAge}
                </Col>
            </FormGroup>
            <FormGroup className={'userAboutMe ' + (!showMore11? 'none':'')} >
                <Col sm={4}>
                    About me:
                </Col>
                <Col sm={4}>
                    {userAboutMe}
                </Col>
            </FormGroup>
            <FormGroup className={'logOutButton ' + (!showMore11? 'none':'')}>
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
    showMore: PropTypes.bool.isRequired
};
//somewhere should be password