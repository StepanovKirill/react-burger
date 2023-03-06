import { TIngredient } from '../../utils/types';

// eslint-disable-next-line import/no-cycle
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT,
  TIngredientsActions,
} from '../actions/ingredients';

export type TIngredientsStateType = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  currentIngredient: TIngredient | null;
};

export const ingredientsInitialState: TIngredientsStateType = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null,
};

export const ingredientsReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: TIngredientsStateType = ingredientsInitialState,
  action: TIngredientsActions,
): TIngredientsStateType => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.ingredients,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case OPEN_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    case CLOSE_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
