import { getIngredientsRequest } from '../../utils/fetch_api'

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const OPEN_INGREDIENT = "OPEN_INGREDIENT";
export const CLOSE_INGREDIENT = "CLOSE_INGREDIENT";

export const getIngredients = () => dispatch => {
  dispatch({
  type: GET_INGREDIENTS_REQUEST
  });
  getIngredientsRequest()
  .then(response => {
    dispatch({
    type: GET_INGREDIENTS_SUCCESS,
      ingredients: response.data
      })
    })
    .catch(e => {
      console.error(e);
      dispatch({
      type: GET_INGREDIENTS_FAILED
      })
    })
}

export const openModalIngredient = (currentIngredient) => {
  return ({
  type: OPEN_INGREDIENT,
  currentIngredient: currentIngredient,
})
}

export const closeModalIngredient = () => {
  return ({
  type: CLOSE_INGREDIENT,
  })
}