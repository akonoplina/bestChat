import React, { PropTypes, Component } from 'react';

export default class UserComponent extends Component {
    render() {
        const { userName, userAvatar, userAge, userAboutMe, showUser } = this.props;
        return <div className={!showUser ? 'none': ''}>
            <div className="userName">
                {userName}
            </div>
            <div className="userAge">
                {userAge}
            </div>
            <div className="userAvatar">
                {userAvatar}
            </div>
            <div className="userAboutMe">
                {userAboutMe}
            </div>
            </div>
    }

}

UserComponent.propTypes = {
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    userAge: PropTypes.string.isRequired,
    userAboutMe: PropTypes.string.isRequired,
    showUser: PropTypes.bool.isRequired
};
//somewhere should be password