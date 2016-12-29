import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { routerMiddleware } from 'react-router-redux';

import createMiddleware from '../middleware/clientMiddleware';

import socketExampleMiddleware from '../middleware/socketExampleMiddleware';


export default function configureStore(initialState, history, client) {

    const logger = createLogger();

    const reduxRouterMiddleware = routerMiddleware(history);

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(createMiddleware(client), reduxRouterMiddleware,thunk, logger,socketExampleMiddleware())
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        });
    }

    return store;
}