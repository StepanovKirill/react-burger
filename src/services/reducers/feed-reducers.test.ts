import {
  WS_CONNECTION_SUCCESS_ORDERS,
  WS_CONNECTION_CLOSED_ORDERS,
  WS_CONNECTION_ERROR_ORDERS,
  WS_GET_ORDERS,
  WS_CONNECTION_SUCCESS_ORDERS_USER,
  WS_CONNECTION_CLOSED_ORDERS_USER,
  WS_CONNECTION_ERROR_ORDERS_USER,
  WS_GET_ORDERS_USER,
  TFeedOrdersActions,
} from '../actions/feed';
import { feedOrdersInitialState, feedOrdersReducer } from './feed-reducer';
import { orders } from '../../utils/fake_data';

describe('Тестирование редьюсера ленты заказов', () => {
  it('возвращение начального состояния', () => {
    expect(feedOrdersReducer(undefined, {} as TFeedOrdersActions)).toEqual(feedOrdersInitialState);
  });
  it('подключение к вебсокетам с общей лентой заказов успешно', () => {
    expect(feedOrdersReducer(feedOrdersInitialState, { type: WS_CONNECTION_SUCCESS_ORDERS })).toEqual({
      ...feedOrdersInitialState,
      wsConnected: true,
    });
  });
  it('подключение к вебсокетам с лентой заказов пользователя успешно', () => {
    expect(feedOrdersReducer(feedOrdersInitialState, { type: WS_CONNECTION_SUCCESS_ORDERS_USER })).toEqual({
      ...feedOrdersInitialState,
      wsConnected: true,
    });
  });
  it('закрытие подключения к вебсокетам с общей лентой заказов', () => {
    expect(
      feedOrdersReducer({ ...feedOrdersInitialState, wsConnected: true }, { type: WS_CONNECTION_CLOSED_ORDERS }),
    ).toEqual(feedOrdersInitialState);
  });
  it('закрытие подключения к вебсокетам с лентой заказов пользователя', () => {
    expect(
      feedOrdersReducer({ ...feedOrdersInitialState, wsConnected: true }, { type: WS_CONNECTION_CLOSED_ORDERS_USER }),
    ).toEqual(feedOrdersInitialState);
  });
  it('ошибка подключения к вебсокетам с общей лентой заказов', () => {
    expect(
      feedOrdersReducer({ ...feedOrdersInitialState, wsConnected: true }, { type: WS_CONNECTION_ERROR_ORDERS }),
    ).toEqual(feedOrdersInitialState);
  });
  it('ошибка подключения к вебсокетам с лентой заказов пользователя', () => {
    expect(
      feedOrdersReducer({ ...feedOrdersInitialState, wsConnected: true }, { type: WS_CONNECTION_ERROR_ORDERS_USER }),
    ).toEqual(feedOrdersInitialState);
  });
  it('получение ленты заказов', () => {
    expect(
      feedOrdersReducer({ ...feedOrdersInitialState, wsConnected: true }, { type: WS_GET_ORDERS, orders }),
    ).toEqual({
      ...feedOrdersInitialState,
      wsConnected: true,
      orders: orders.orders,
      total: orders.total,
      totalToday: orders.totalToday,
    });
  });
  it('получение ленты заказов пользователя', () => {
    expect(
      feedOrdersReducer({ ...feedOrdersInitialState, wsConnected: true }, { type: WS_GET_ORDERS_USER, orders }),
    ).toEqual({ ...feedOrdersInitialState, wsConnected: true, userOrders: orders.orders });
  });
});
