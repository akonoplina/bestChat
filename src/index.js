import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import routes from './routes';
import './styles/app.scss';
import configureStore from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <div className='app'>
            <Router history={browserHistory} routes={routes} />
        </div>
    </Provider>,
    document.getElementById('root') /* global document*/
);
