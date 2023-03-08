import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/* eslint import/no-cycle: 0 */
import rootReducer from './reducers';
import socketMiddleware from './middlewares/wsSocketMiddleware';
import { wsOrdersUserActions, wsOrdersActions } from './actions/feed';

const WS_URL = 'wss://norma.nomoreparties.space/orders';

interface ObjectWithKeys {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const composeEnhancers =
  typeof window === 'object' && (window as ObjectWithKeys).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as ObjectWithKeys).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(WS_URL, wsOrdersActions), socketMiddleware(WS_URL, wsOrdersUserActions)),
);

const store = createStore(rootReducer, enhancer);

export default store;
