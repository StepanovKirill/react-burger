import { postOrderRequest } from '../../utils/fetch_api.js'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER'
export const CLOSE_ORDER = 'CLOSE_ORDER'

export const postOrder = (ingredients) => {
  return (
    function(dispatch) {
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

export const closeModalOrder = () => {
    return {
        type: CLOSE_ORDER
    }
}