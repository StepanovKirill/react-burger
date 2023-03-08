import { TIngredient } from '../../utils/types';
import {
  RESET_TOTAL_PRICE,
  SET_TOTAL_PRICE,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_INGREDIENTS,
  TConstructorActions,
} from '../actions/constructor';

type TConstructorStateType = {
  totalPrice: number;
  ingredientsConstructor: Array<TIngredient>;
};

export const constructorInitialState: TConstructorStateType = {
  totalPrice: 0,
  ingredientsConstructor: [],
};

export function constructorReducer(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: TConstructorStateType = constructorInitialState,
  action: TConstructorActions,
): TConstructorStateType {
  switch (action.type) {
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    }
    case RESET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: 0,
      };
    }
    case ADD_INGREDIENT: {
      let ingredientsConstructor = [];

      if (action.item.type === 'bun') {
        ingredientsConstructor = state.ingredientsConstructor
          ? [...state.ingredientsConstructor, action.item, action.item]
          : [action.item, action.item];
      } else {
        ingredientsConstructor = state.ingredientsConstructor
          ? [...state.ingredientsConstructor, action.item]
          : [action.item];
      }

      return {
        ...state,
        ingredientsConstructor,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor].filter((item) => item.uid !== action.uid),
      };
    }
    case MOVE_INGREDIENT: {
      const bunIngredient = state.ingredientsConstructor.filter((item) => item.type === 'bun');
      const otherIngredients = state.ingredientsConstructor.filter((item) => item.type !== 'bun');
      const movedElement = otherIngredients[action.sourceIndex];
      otherIngredients.splice(action.sourceIndex, 1);
      otherIngredients.splice(action.targetIndex, 0, movedElement);
      return {
        ...state,
        ingredientsConstructor: [...bunIngredient, ...otherIngredients],
      };
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        ingredientsConstructor: [],
      };
    }
    default: {
      return state;
    }
  }
}
