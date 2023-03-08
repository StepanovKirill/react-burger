import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLOSE_ORDER,
  RESET_ORDER_NUMBER,
  TOrderActions,
} from '../actions/order';
import { orderInitialState, orderReducer } from './order-reducer';

describe('Тест отправки заказа', () => {
  it('Проверка начального состояния', () => {
    expect(orderReducer(undefined, {} as TOrderActions)).toEqual(orderInitialState);
  });
  it('Отправка заказа', () => {
    expect(orderReducer(orderInitialState, { type: POST_ORDER_REQUEST })).toEqual({
      ...orderInitialState,
      orderRequest: true,
    });

    expect(orderReducer({ ...orderInitialState, orderRequest: true }, { type: POST_ORDER_FAILED })).toEqual({
      ...orderInitialState,
      orderFailed: true,
    });

    expect(
      orderReducer({ ...orderInitialState, orderRequest: true }, { type: POST_ORDER_SUCCESS, orderNumber: 422 }),
    ).toEqual({ ...orderInitialState, orderNumber: 422 });

    expect(orderReducer({ ...orderInitialState, orderNumber: 4242 }, { type: RESET_ORDER_NUMBER })).toEqual(
      orderInitialState,
    );
  });
  it('закрытие модалки', () => {
    expect(orderReducer({ ...orderInitialState, orderNumber: 4242 }, { type: CLOSE_ORDER })).toEqual(orderInitialState);
  });
});
