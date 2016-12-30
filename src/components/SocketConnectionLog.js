import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

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

        return <Form horizontal className = {'showConnectionLog ' + (!showConnectionLog? 'none': '')}>
            <FormGroup>
                <h3>Socket connection log</h3>
                <FormControl className="form-control"
                             rows="1"
                             readOnly
                             placeholder="Waiting ..."
                             value={
                                 history.map((historyElement, index) =>
                                 'index = ' + index +
                                 ' loaded = ' + historyElement.loaded.toString() +
                                 ' message = ' + historyElement.message.toString() +
                                 ' connected = ' + historyElement.connected.toString() + ' \n').reverse().join('')
                             } componentClass="textarea" />
            </FormGroup>
            <FormGroup>
                <Button
                    className="btn btn-primary btn-sm"
                    onClick={::this.handleConnectButton}>
                    Connect
                </Button>
            </FormGroup>
            <FormGroup>
                <Button
                    className="btn btn-danger btn-sm"
                    onClick={::this.handleDisconnectButton}>
                    Disconnect
                </Button>
            </FormGroup>
        </Form>
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