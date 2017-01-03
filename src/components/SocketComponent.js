import React, { PropTypes, Component } from 'react';

import { Button } from 'react-bootstrap';

export default class SocketComponent extends Component {

    handleSendButton(e) {
        e.preventDefault();
        this.props.socketsMessageSend(this.refs.messageText.value);
        this.refs.messageText.value = '';
    }
    render() {

        const { connected, messageHistory, userName } = this.props;

        return <div className = {(!connected? 'none': '')}>
            <div>
                <h3>Welcome to the chat{', ' + userName}!!!</h3>
            </div>
            <div>
                <h3>Message log</h3>
                <ul>
                    {
                        messageHistory.map((messageHistoryElement, index) =>
                            <li key={index} className={'unstyled'}>
                                <span className={(messageHistoryElement.direction === '->') ?
                                    'glyphicon glyphicon-arrow-right' : 'glyphicon glyphicon-arrow-left'}></span>
                                {messageHistoryElement.message}
                            </li>
                        )}
                </ul>
                <form
                    className="form-inline"
                    onSubmit={::this.handleSendButton}>
                    <p></p>
                    <div className="form-group">
                        <input
                            className="form-control input-sm"
                            type="text"
                            ref="messageText" readOnly = {(connected === true) ? false : true}>
                        </input>
                    </div>
                    <Button
                        className="btn btn-primary btn-sm"
                        onClick={::this.handleSendButton}
                        disabled = {(connected === true) ? false : true}>
                        <i className="fa fa-sign-in"/> Send
                    </Button>
                </form>
            </div>
        </div>
    }
}

SocketComponent.propTypes = {
    connected: PropTypes.bool.isRequired,
    messageHistory: PropTypes.array.isRequired,
    socketsMessageSend: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired

};