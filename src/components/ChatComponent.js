import React, { PropTypes, Component } from 'react';

export default class ChatComponent extends Component {

    render() {

        const { messageListTitle, showChatPage } = this.props;

        return <div className = {'chatWrapper ' + (!showChatPage? 'none': '')}>
            <div>
                <h1>Chat Page</h1>
                <p>Connection status</p>
                <p><label>{messageListTitle}:</label>
                    <textarea placeholder="Waiting ..." readOnly="readOnly" rows="1"
                              value="index = 2, loaded = true, message = Connected, connected = true,
                              index = 1, loaded = false, message = Connecting..., connected = false"/>
                    <button className="btn btn-primary btn-sm">
                        <i className="fa fa-sign-in"/> Connect
                    </button>
                    <button className="btn btn-danger btn-sm">
                        <i className="fa fa-sign-out"/> Disconnect
                    </button>
                    <input className="messageText" type="text"/>
                </p>
                <h3>Message log</h3>
                <ul>
                    <li key="1" className="unstyled">
                        <span className="glyphicon glyphicon-arrow-right"></span>
                        Socket string
                    </li>
                    <li key="2" className="unstyled">
                        <span className="glyphicon glyphicon-arrow-left"></span>
                        [ECHO] Socket string
                    </li>
                </ul>
                <form className="form-inline">
                    <p></p>
                    <div className="form-group">
                        <input
                            className="form-control input-sm"
                            type="text"
                            ref="message_text"></input>
                    </div>
                    <button className="btn btn-primary btn-sm">
                        <i className="fa fa-sign-in"/> Send
                    </button>
                </form>
            </div>
        </div>
    }
}

ChatComponent.propTypes = {
    showChatPage: PropTypes.bool.isRequired,
    messageListTitle: PropTypes.string.isRequired
};