import { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/cookie_handlers';
import {
  TWsOrdersActions,
  TWsOrdersUserActions,
  WS_CONNECTION_START_ORDERS,
  WS_CONNECTION_START_ORDERS_USER,
} from '../actions/feed';
/* eslint-disable-next-line import/no-cycle */
import { AppDispatch, RootState } from '../types';

const socketMiddleware = (wsUrl: string, wsActions: TWsOrdersActions | TWsOrdersUserActions): Middleware => (
  store: MiddlewareAPI<AppDispatch, RootState>,
) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch, getState } = store;
    const { isLogged } = getState().user;
    const token = isLogged ? `?token=${getCookie('token')?.replace('Bearer ', '')}` : '';
    const { type } = action;
    const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

    if (type === wsInit && type === WS_CONNECTION_START_ORDERS_USER) {
      socket = new WebSocket(`${wsUrl}${token}`);
    }

    if (type === wsInit && type === WS_CONNECTION_START_ORDERS) {
      socket = new WebSocket(`${wsUrl}/all`);
    }

    if (socket) {
      socket.onopen = (event) => {
        dispatch({ type: onOpen, orders: event });
      };

      socket.onerror = (event) => {
        dispatch({ type: onError, orders: event });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const message = JSON.parse(data);
        dispatch({ type: onOrders, orders: message });
      };

      socket.onclose = (event) => {
        dispatch({ type: onClose, orders: event });
      };
    }
    next(action);
  };
};

export default socketMiddleware;
