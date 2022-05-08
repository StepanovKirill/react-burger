export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE'
export const RESET_TOTAL_PRICE = 'RESET_TOTAL_PRICE'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS'

export const resetTotalPrice = () => {
  return {
    type: RESET_TOTAL_PRICE
  }
}

export const setTotalPrice = (totalPrice) => {
  return {
    type: SET_TOTAL_PRICE,
    totalPrice: totalPrice
  }
}
export const addIngredient = (item, uid) => {
  return ({
    type: ADD_INGREDIENT,
    item: {...item, uid: uid}
  })
}

export const deleteIngredient = (uid) => {
  return ({
    type: DELETE_INGREDIENT,
    uid: uid
  })
}

export const moveIngredient = (sourceIndex, targetIndex) => {
  return ({
    type: MOVE_INGREDIENT,
    sourceIndex,
    targetIndex,
  })
}

export const resetIngredients = () => {
  return {
    type: RESET_INGREDIENTS
  }
}