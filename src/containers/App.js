import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../components/AuthComponent';

import SocketComponent from '../components/SocketComponent';

import UserComponent from '../components/UserComponent';

import * as authActions from '../actions/authActions';

import * as socketActions from '../actions/socketActions';

class App extends Component {
    render() {
        const { authReducer, socketReducer} = this.props;

        const { authSendData} = this.props.authActions;
        const { socketsConnect, socketsMessageSend } = this.props.socketActions;

        return (<div>
            <AuthComponent authSendData={authSendData} errorMessage={authReducer.errorMessage} socketsConnect={socketsConnect} />

            <SocketComponent
                messageHistory={socketReducer.messageHistory}
                socketsMessageSend={socketsMessageSend} userName={socketReducer.userName}
                userAvatar={socketReducer.userAvatar}
            />

            <UserComponent />
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        socketReducer: state.socketReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        socketActions: bindActionCreators(socketActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
