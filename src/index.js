import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import App from './containers/App';
import './styles/app.scss';
import configureStore from './store/configureStore';

const store = configureStore();


render(
    <Provider store={store}>
        <div className='app'>
            <App />
        </div>
    </Provider>,
    /* global document*/
    document.getElementById('root'),
);
