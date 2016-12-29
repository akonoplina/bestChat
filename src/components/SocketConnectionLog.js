import React, { PropTypes, Component } from 'react';

export default class SocketConnectionLog extends Component {

    handleConnectButton (e){
        e.preventDefault();
        this.props.connectAction();
    }
    handleDisconnectButton (e){
        e.preventDefault();
        this.props.disconnectAction();
    }
    render() {

        const { history, showConnectionLog } = this.props;

        return <div className = {'showConnectionLog ' + (!showConnectionLog? 'none': '')}>
            <div>
                <h3>Socket connection log</h3>
                <textarea
                    className="form-control"
                    rows="1"
                    readOnly
                    placeholder="Waiting ..."
                    value={
                        history.map((historyElement, index) =>
                        'index = ' + index +
                        ' loaded = ' + historyElement.loaded.toString() +
                        ' message = ' + historyElement.message.toString() +
                        ' connected = ' + historyElement.connected.toString() + ' \n').reverse().join('')
                    }/>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={::this.handleConnectButton}>
                    <i className="fa fa-sign-in"/> Connect
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={::this.handleDisconnectButton}>
                    <i className="fa fa-sign-out"/> Disconnect
                </button>
            </div>
        </div>
    }
}

SocketConnectionLog.propTypes = {
    showConnectionLog : PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    history: PropTypes.array.isRequired,
    connectAction: PropTypes.func.isRequired,
    disconnectAction: PropTypes.func.isRequired,
    connectingAction: PropTypes.func.isRequired,
    disconnectingAction: PropTypes.func.isRequired

};