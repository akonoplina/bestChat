import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthComponent from '../components/AuthComponent';

import SocketComponent from '../components/SocketComponent';

import UserComponent from '../components/UserComponent';

import * as authActions from '../actions/authActions';

import * as userActions from '../actions/userActions';

import * as socketActions from '../actions/socketActions';

class App extends Component {
    render() {
        const { authReducer, socketReducer, userReducer } = this.props;

        const { authSendData, userExit } = this.props.authActions;
        const { socketsConnect, socketsMessageSend } = this.props.socketActions;
        const { showMoreAction, showLessAction } = this.props.userActions;

        return (<div>
            <AuthComponent authSendData={authSendData} errorMessage={authReducer.errorMessage} socketsConnect={socketsConnect} />

            <SocketComponent
                connected={socketReducer.connected} messageHistory={socketReducer.messageHistory}
                socketsMessageSend={socketsMessageSend} userName={userReducer.userName}
                userAvatar={userReducer.userAvatar}
            />

            <UserComponent
                showLessAction={showLessAction} showMoreAction={showMoreAction}
                showUser={userReducer.showUser} userName={userReducer.userName}
                userAboutMe={userReducer.userAboutMe}
                userAvatar={userReducer.userAvatar} userAge={userReducer.userAge}
                userExit={userExit} showMore={userReducer.showMore}
            />
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        authReducer: state.authReducer,
        socketReducer: state.socketReducer,
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        socketActions: bindActionCreators(socketActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
