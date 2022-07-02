import {
  POST_ORDER_REQUEST, 
  POST_ORDER_SUCCESS, 
  POST_ORDER_FAILED,
  CLOSE_ORDER,
  RESET_ORDER_NUMBER,
  TOrderActions
} from '../actions/order'

type TOrderState = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const orderInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
}

export const orderReducer = (state: TOrderState = orderInitialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return ({
        ...state,
        orderRequest: true
      })
    }
    case POST_ORDER_SUCCESS: {
      return ({
        ...state,
        orderRequest: false,
        orderNumber: action.orderNumber,
        orderFailed: false
      })
    }
    case POST_ORDER_FAILED: {
      return ({
        ...state,
        orderRequest: false,
        orderFailed: true
      })
    }
    case CLOSE_ORDER: {
      return {
          ...state,
          orderNumber: null
      }
    }
    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: null
      }
    }
    default: {
      return state
    }
  }
}