import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl } from 'react-bootstrap';

export default class SocketComponent extends Component {

    constructor() {
        super();
        /* global localStorage*/
        const jwtIsSet = !!localStorage.getItem('jwt');
        const connected = localStorage.getItem('connected');
        this.state = {
            messageText: '',
            jwtIsSet,
            connected
        };
    }
    handleSendButton(e) {
        e.preventDefault();
        if (this.state.messageText.length > 0) {
            this.props.socketsMessageSend(this.state.messageText, this.props.userName, this.props.userAvatar);
            document.getElementsByClassName('messageText')[0].value = ''; /* global document*/
            this.setState({messageText: ''});
        }
    }
    handleChange(e) {
        this.setState({messageText: e.target.value});
    }
    render() {
        const { messageHistory, userName } = this.props;

        return (<Form
            horizontal
            className={((!this.state.connected || !userName || !this.state.jwtIsSet) ? 'socketWrapper none' : 'socketWrapper')}
            onSubmit={this.handleSendButton}>
            <FormGroup>
                <Col sm={5}>
                    <h3>Welcome to the chat, {userName}!!!</h3>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={2}>
                    <h3>Message log</h3>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={4}>
                    <ul>
                        {
                        messageHistory.map((messageHistoryElement, index) =>
                            <li key={index} className='userMessageWrapper'>
                                <img
                                    role='presentation'
                                    height={16}
                                    width={16}
                                    className='messageUserAvatar'
                                    src={require(`../pics/${messageHistoryElement.userAvatar}`)} // eslint-disable-line global-require
                                />
                                <span className='messageUserName'>{`${messageHistoryElement.userName}  wrote:`}</span>
                                <span className='userMessage'>{messageHistoryElement.message}</span>
                            </li>)
                        }
                    </ul>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={2}>
                    <FormControl
                        componentClass='textarea'
                        readOnly={!this.state.connected}
                        onChange={this.handleChange.bind(this)}
                        className='messageText'
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={1}>
                    <Button bsStyle='primary' onClick={this.handleSendButton.bind(this)} disabled={!this.state.connected}>
                        Send
                    </Button>
                </Col>
            </FormGroup>
        </Form>);
    }
}

SocketComponent.propTypes = {
    messageHistory: PropTypes.array.isRequired,
    socketsMessageSend: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired

};
