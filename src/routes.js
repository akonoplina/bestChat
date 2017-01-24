import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './containers/App';

import Auth from './components/AuthComponent';

import Socket from './components/SocketComponent';

import User from './components/UserComponent';

import SignIn from './components/SignInFormComponent';

import SignUp from './components/SignUpFormComponent';

import NotFound from './components/NotFoundComponent';

export default (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Auth} />
            <Route path='auth' component={Auth} errorMessage={App.props.authReducer.errorMessage} />
            <Route path='signin' component={SignIn} authSendData={this.props.authActions.authSendData} />
            <Route path='signup' component={SignUp} authSendData={this.props.authActions.authSendData} />
            <Route path='chat' component={Socket} messageHistory={this.props.socketReducer.messageHistory} socketsMessageSend={this.props.socketActions.socketsMessageSend} />
            <Route path='chat' component={User} userExit={this.props.authActions.userExit} />
        </Route>
        <Route path='*' component={NotFound} />
    </div>
);
