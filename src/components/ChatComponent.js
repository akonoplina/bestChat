import React, { PropTypes, Component } from 'react';

export default class ChatComponent extends Component {

    render() {

        const { messageListTitle, showChatPage } = this.props;

        return <div className = {'chatWrapper ' + (!showChatPage? 'none': '')}>
            <div>
                <p><label>{messageListTitle}:</label>
                    <input className="messageText" type="text"/></p>
            </div>
        </div>
    }
}

ChatComponent.propTypes = {
    showChatPage: PropTypes.bool.isRequired,
    messageListTitle: PropTypes.string.isRequired
};