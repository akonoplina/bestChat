import React, { PropTypes, Component } from 'react';

import ReactDOM from 'react-dom';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export default class SocketComponent extends Component {

    handleSendButton(e) {
        e.preventDefault();
        this.props.socketsMessageSend(ReactDOM.findDOMNode(this.refs.messageText).value);
        ReactDOM.findDOMNode(this.refs.messageText).value = '';
    }
    render() {

        const { connected, messageHistory, userName } = this.props;

        return <Form horizontal className = {'socketWrapper ' + ((!connected || !userName)? 'none': '')}>
            <FormGroup>
                <Col sm={5}>
                    <h3>Welcome to the chat{', ' + userName}!!!</h3>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={2}>
                    <h3>Message log</h3>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={1}>
                    <ul>
                        {
                            messageHistory.map((messageHistoryElement, index) =>
                                <li key={index} className={'unstyled'}>
                                    <span className={(messageHistoryElement.direction === '->') ?
                                        'glyphicon glyphicon-arrow-right' : 'glyphicon glyphicon-arrow-left'}></span>
                                    {messageHistoryElement.message}
                                    {messageHistoryElement.userName}
                                    {messageHistoryElement.userAvatar}
                                </li>
                            )}
                    </ul>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={2}>
                    <FormControl ref="messageText" readOnly = {(connected === true) ? false : true}/>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={1}>
                <Button bsStyle="primary" onClick={::this.handleSendButton} disabled = {(connected === true) ? false : true}>
                    Send
                </Button>
                </Col>
            </FormGroup>
        </Form>
    }
}

SocketComponent.propTypes = {
    connected: PropTypes.bool.isRequired,
    messageHistory: PropTypes.array.isRequired,
    socketsMessageSend: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired

};