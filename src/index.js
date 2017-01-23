import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import App from './containers/App';
import './styles/app.scss';
import configureStore from './store/configureStore';

import Auth from './components/AuthComponent';

import Socket from './components/SocketComponent';

import User from './components/UserComponent';

import SignIn from './components/SignInFormComponent';

import SignUp from './components/SignUpFormComponent';

import NotFound from './components/NotFoundComponent';

const store = configureStore();

render(
    <Provider store={store}>
        <div className='app'>
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Auth} />
                    <Route path='auth' component={Auth} />
                    <Route path='signin' component={SignIn} />
                    <Route path='signup' component={SignUp} />
                    <Route path='chat' component={Socket} />
                    <Route path='chat' component={User} />
                </Route>
                <Route path='*' component={NotFound} />
            </Router>
        </div>
    </Provider>,
    document.getElementById('root') /* global document*/
);
