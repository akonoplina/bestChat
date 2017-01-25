import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './containers/App';

import Auth from './components/AuthComponent';

import Socket from './components/SocketComponent';

import SignIn from './components/SignInFormComponent';

import SignUp from './components/SignUpFormComponent';

import NotFound from './components/NotFoundComponent';

export default (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Auth} />
            <Route path='auth' component={Auth} />
            <Route path='signin' component={SignIn} />
            <Route path='signup' component={SignUp} />
            <Route path='chat' component={Socket} />
        </Route>
        <Route path='*' component={NotFound} />
    </div>
);
