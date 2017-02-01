import React, { PropTypes, Component } from 'react';

import { Button, Form, FormGroup, Col, FormControl } from 'react-bootstrap';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { browserHistory } from 'react-router';

import { socketsConnect, socketsMessageSend, socketsDisconnect } from '../../actions/socketActions';

import { userExit } from '../../actions/authActions';

class SocketComponent extends Component {
    constructor() {
        super();
        /* global localStorage*/
        /* global window*/
        const userObj = JSON.parse(localStorage.getItem('userObj'));
        const connected = localStorage.getItem('connected');
        let userName = '';
        let userAge = '';
        let userAvatar = '';
        let userAboutMe = '';
        if (userObj) {
            userName = userObj.userName;
            userAge = userObj.userAge;
            userAvatar = userObj.userAvatar;
            userAboutMe = userObj.userAboutMe;
        }
        this.state = {
            showHide: false,
            connected,
            userObj,
            userName,
            userAge,
            userAvatar,
            userAboutMe};
    }
    componentWillMount() {
        const connected = localStorage.getItem('connected');
        const userObj = localStorage.getItem('userObj');
        const socketsDisconnect = this.props.socketsDisconnect;
        const socketsConnect = this.props.socketsConnect;
        window.onbeforeunload = () => { socketsDisconnect(); socketsConnect(); };
        if (!userObj && !connected) {
            browserHistory.push('/auth');
        }
    }
    onLogoutButtonPress(e) {
        e.preventDefault();
        const userExit = this.props.userExit;
        userExit();
        browserHistory.push('/auth');
    }
    showHide() {
        this.setState({ showHide: !this.state.showHide });
    }
    handleSendButton() {
        const socketsMessageSend = this.props.socketsMessageSend;
        const messageText = document.getElementsByClassName('messageText')[0].value;
        if (messageText.length > 0) {
            socketsMessageSend(messageText, this.state.userName, this.state.userAvatar);
            document.getElementsByClassName('messageText')[0].value = ''; /* global document*/
        }
    }
    render() {
        const messageHistory = this.props.messageHistory;

        return (<div className={(this.state.connected && this.state.userObj ? 'commonChatBlock' : 'commonChatBlock none')}>
            <Form
                horizontal
                className='socketWrapper'
                onSubmit={this.handleSendButton}>
                <FormGroup>
                    <Col>
                        <h3>Welcome to the chat, {this.state.userName}!!!</h3>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <h3>Message log</h3>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <ul>
                            {(messageHistory) ?
                            messageHistory.map((messageHistoryElement, index) =>
                                <li key={index} className='userMessageWrapper'>
                                    <img
                                        role='presentation'
                                        height={16}
                                        width={16}
                                        className='messageUserAvatar'
                                        src={require(`../../pics/${messageHistoryElement.userAvatar}`)} // eslint-disable-line global-require
                                    />
                                    <span className='messageUserName'>{`${messageHistoryElement.userName}  wrote:`}</span>
                                    <span className='userMessage'>{messageHistoryElement.message}</span>
                                </li>) : ''
                            }
                        </ul>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <FormControl
                            componentClass='textarea'
                            readOnly={!this.state.connected}
                            className='messageText'
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button bsStyle='primary' onClick={this.handleSendButton.bind(this)} disabled={!this.state.connected}>
                            Send
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
            <Form horizontal className={(this.state.userObj ? 'userWrapper' : 'userWrapper none')}>
                <FormGroup className='userAvatar'>
                    <Col>
                        {(this.state.userAvatar.length !== 0) ? <img
                            width={128}
                            height={128}
                            role='presentation'
                            src={require(`../../pics/${this.state.userAvatar}`)} /> : // eslint-disable-line global-require
            'no avatar yet'}
                    </Col>
                </FormGroup>
                <FormGroup className={(this.state.showHide ? 'showHideButton none' : 'showHideButton')} onClick={this.showHide.bind(this)}>
                    <Col>
                        <Button bsStyle='primary'>
                            Show more
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup className={(!this.state.showHide ? 'showLessButton none' : 'showLessButton')} onClick={this.showHide.bind(this)}>
                    <Col>
                        <Button bsStyle='primary'>
                            Show less
                        </Button>
                    </Col>
                </FormGroup>
                <FormGroup className={(!this.state.showHide ? 'userName none' : 'userName')}>
                    <Col>
                        Name:
                    </Col>
                    <Col>
                        {this.state.userName}
                    </Col>
                </FormGroup>
                <FormGroup className={(!this.state.showHide ? 'userAge none' : 'userAge')}>
                    <Col>
                        Age:
                    </Col>
                    <Col>
                        {this.state.userAge}
                    </Col>
                </FormGroup>
                <FormGroup className={(!this.state.showHide ? 'userAboutMe none' : 'userAboutMe')} >
                    <Col>
                        About me:
                    </Col>
                    <Col>
                        {this.state.userAboutMe}
                    </Col>
                </FormGroup>
                <FormGroup className={(!this.state.showHide ? 'logOutButton none' : 'logOutButton')}>
                    <Col>
                        <Button bsStyle='primary' onClick={this.onLogoutButtonPress.bind(this)}>
                            Logout
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>);
    }
}

SocketComponent.propTypes = {
    messageHistory: PropTypes.array.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    socketsMessageSend: PropTypes.func.isRequired,
    socketsDisconnect: PropTypes.func.isRequired,
    userExit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        messageHistory: state.socketReducer.messageHistory
    };
}

function mapDispatchToProps(dispatch) {
    return {
        socketsConnect: bindActionCreators(socketsConnect, dispatch),
        socketsMessageSend: bindActionCreators(socketsMessageSend, dispatch),
        socketsDisconnect: bindActionCreators(socketsDisconnect, dispatch),
        userExit: bindActionCreators(userExit, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketComponent);
