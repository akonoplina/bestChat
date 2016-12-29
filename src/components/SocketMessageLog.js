import React, { PropTypes, Component } from 'react';

import { Button } from 'react-bootstrap';

export default class SocketMessageLog extends Component {

    handleSendButton(e) {
        e.preventDefault();
        this.props.socketsMessageSend(this.refs.message_text.value);
        this.refs.message_text.value = '';
    }
    render() {

        const { showMessageLog, loaded, connected, message_history } = this.props;

        return <div className = {'showMessageLog ' + (!showMessageLog? 'none': '')}>
            <div>
                <h3>Message log</h3>
                <ul>
                    {
                        message_history.map((messageHistoryElement, index) =>
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
                            ref="message_text" readOnly = {(loaded && connected === true) ? false : true}>
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

SocketMessageLog.propTypes = {
    showMessageLog : PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    message_history: PropTypes.array.isRequired,
    socketsMessageSend: PropTypes.func.isRequired

};