import { postOrderRequest } from '../../utils/fetch_api';
import { AppDispatch, AppThunk} from "../types";

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const RESET_ORDER_NUMBER: 'RESET_ORDER_NUMBER' = 'RESET_ORDER_NUMBER';
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER';

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
};

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: number | null;
};

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
};

export interface IResetOrderNumber {
  readonly type: typeof RESET_ORDER_NUMBER;
};

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
};

export type TOrderActions = IPostOrderRequest | IPostOrderSuccess | IPostOrderFailed | IResetOrderNumber | ICloseOrder;

export const postOrder: AppThunk = (ingredients: {ingredients: string[]}) => {
  return (
    function(dispatch: AppDispatch) {
      dispatch({
        type: POST_ORDER_REQUEST
      })
      
      postOrderRequest(ingredients)
      .then(response => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNumber: response.order.number
        })
      })
      .catch(e => {
        console.error(e);
        dispatch({
          type: POST_ORDER_FAILED
        })
      })
    }
  )
}

export const closeModalOrder = (): ICloseOrder => {
  return {
    type: CLOSE_ORDER
  }
}