import { TOrders } from '../../utils/types';

export const WS_CONNECTION_START_ORDERS: 'WS_CONNECTION_START_ORDERS' = 'WS_CONNECTION_START_ORDERS';
export const WS_CONNECTION_SUCCESS_ORDERS: 'WS_CONNECTION_SUCCESS_ORDERS' = 'WS_CONNECTION_SUCCESS_ORDERS';
export const WS_CONNECTION_ERROR_ORDERS: 'WS_CONNECTION_ERROR_ORDERS' = 'WS_CONNECTION_ERROR_ORDERS';
export const WS_CONNECTION_CLOSED_ORDERS: 'WS_CONNECTION_CLOSED_ORDERS' = 'WS_CONNECTION_CLOSED_ORDERS';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export const WS_CONNECTION_START_ORDERS_USER: 'WS_CONNECTION_START_ORDERS_USER' = 'WS_CONNECTION_START_ORDERS_USER';
export const WS_CONNECTION_SUCCESS_ORDERS_USER: 'WS_CONNECTION_SUCCESS_ORDERS_USER' = 'WS_CONNECTION_SUCCESS_ORDERS_USER';
export const WS_CONNECTION_ERROR_ORDERS_USER: 'WS_CONNECTION_ERROR_ORDERS_USER' = 'WS_CONNECTION_ERROR_ORDERS_USER';
export const WS_CONNECTION_CLOSED_ORDERS_USER: 'WS_CONNECTION_CLOSED_ORDERS_USER' = 'WS_CONNECTION_CLOSED_ORDERS_USER';
export const WS_GET_ORDERS_USER: 'WS_GET_ORDERS_USER' = 'WS_GET_ORDERS_USER';

export interface IWsConnectionStartOrdersAction {
  readonly type: typeof WS_CONNECTION_START_ORDERS;
};

export interface IWsConnectionSuccessOrdersAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_ORDERS;
};

export interface IWsConnectionErrorOrdersAction {
  readonly type: typeof WS_CONNECTION_ERROR_ORDERS;
};

export interface IWsConnectionClosedOrdersAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ORDERS;
};

export interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly orders: TOrders;
};

export interface IWsConnectionStartOrdersUserAction {
  readonly type: typeof WS_CONNECTION_START_ORDERS_USER;
};

export interface IWsConnectionSuccessOrdersUserAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_ORDERS_USER;
};

export interface IWsConnectionErrorOrdersUserAction {
  readonly type: typeof WS_CONNECTION_ERROR_ORDERS_USER;
};

export interface IWsConnectionClosedOrdersUserAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ORDERS_USER;
};

export interface IWsGetOrdersUserAction {
  readonly type: typeof WS_GET_ORDERS_USER;
  readonly orders: TOrders;
};

export type TFeedOrdersActions = 
  | IWsConnectionStartOrdersAction
  | IWsConnectionSuccessOrdersAction
  | IWsConnectionErrorOrdersAction
  | IWsConnectionClosedOrdersAction
  | IWsGetOrdersAction
  | IWsConnectionStartOrdersUserAction
  | IWsConnectionSuccessOrdersUserAction
  | IWsConnectionErrorOrdersUserAction
  | IWsConnectionClosedOrdersUserAction
  | IWsGetOrdersUserAction;


export const wsConnectionStartOrdersAction = (): IWsConnectionStartOrdersAction => ({
  type: WS_CONNECTION_START_ORDERS
});

export const wsConnectionSuccessOrdersAction = (): IWsConnectionSuccessOrdersAction => ({
  type: WS_CONNECTION_SUCCESS_ORDERS
});

export const wsConnectionErrorOrdersAction = (): IWsConnectionErrorOrdersAction => ({
  type: WS_CONNECTION_ERROR_ORDERS
});

export const wsConnectionClosedOrdersAction = (): IWsConnectionClosedOrdersAction => ({
  type: WS_CONNECTION_CLOSED_ORDERS
});

export const wsGetOrdersAction = (orders: TOrders): IWsGetOrdersAction => ({
  type: WS_GET_ORDERS,
  orders
});

export const wsConnectionStartOrdersUserAction = (): IWsConnectionStartOrdersUserAction => ({
  type: WS_CONNECTION_START_ORDERS_USER
});

export const wsConnectionSuccessOrdersUserAction = (): IWsConnectionSuccessOrdersUserAction => ({
  type: WS_CONNECTION_SUCCESS_ORDERS_USER
});

export const wsConnectionErrorOrdersUserAction = (): IWsConnectionErrorOrdersUserAction => ({
  type: WS_CONNECTION_ERROR_ORDERS_USER
});

export const wsConnectionClosedOrdersUserAction = (): IWsConnectionClosedOrdersUserAction => ({
  type: WS_CONNECTION_CLOSED_ORDERS_USER
});

export const wsGetOrdersUserAction = (orders: TOrders): IWsGetOrdersUserAction => ({
  type: WS_GET_ORDERS_USER,
  orders
});

export type TWsOrdersActions = {
  wsInit: typeof WS_CONNECTION_START_ORDERS;
  onOpen: typeof WS_CONNECTION_SUCCESS_ORDERS;
  onClose: typeof WS_CONNECTION_CLOSED_ORDERS;
  onError: typeof WS_CONNECTION_ERROR_ORDERS;
  onOrders: typeof WS_GET_ORDERS;
};
  
export type TWsOrdersUserActions = {
  wsInit: typeof WS_CONNECTION_START_ORDERS_USER;
  onOpen: typeof WS_CONNECTION_SUCCESS_ORDERS_USER;
  onClose: typeof WS_CONNECTION_CLOSED_ORDERS_USER;
  onError: typeof WS_CONNECTION_ERROR_ORDERS_USER;
  onOrders: typeof WS_GET_ORDERS_USER;
};

export const wsOrdersActions: TWsOrdersActions = {
  wsInit: WS_CONNECTION_START_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_ORDERS,
  onClose: WS_CONNECTION_CLOSED_ORDERS,
  onError: WS_CONNECTION_ERROR_ORDERS,
  onOrders: WS_GET_ORDERS,
  };
  
  export const wsOrdersUserActions: TWsOrdersUserActions = {
  wsInit: WS_CONNECTION_START_ORDERS_USER,
  onOpen: WS_CONNECTION_SUCCESS_ORDERS_USER,
  onClose: WS_CONNECTION_CLOSED_ORDERS_USER,
  onError: WS_CONNECTION_ERROR_ORDERS_USER,
  onOrders: WS_GET_ORDERS_USER,
  };