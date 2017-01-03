import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { routerMiddleware } from 'react-router-redux';

import socketMiddleware from '../middleware/socketMiddleware';


export default function configureStore(initialState, history) {

    const logger = createLogger();

    const reduxRouterMiddleware = routerMiddleware(history);

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(reduxRouterMiddleware,thunk, logger,socketMiddleware())
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