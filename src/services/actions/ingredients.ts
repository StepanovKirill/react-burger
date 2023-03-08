import { getIngredientsRequest } from '../../utils/fetch_api';
import { TIngredient } from '../../utils/types';
// eslint-disable-next-line import/no-cycle
import { AppDispatch, AppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;
export const OPEN_INGREDIENT = 'OPEN_INGREDIENT' as const;
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT' as const;

export interface TGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface TGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export interface TGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface TOpenIngredient {
  readonly type: typeof OPEN_INGREDIENT;
  readonly currentIngredient: TIngredient;
}

export interface TCloseIngredient {
  readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsFailed
  | TOpenIngredient
  | TCloseIngredient;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  getIngredientsRequest()
    .then((response) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: response.data,
      });
    })
    .catch((e) => {
      console.error(e);
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
};

/* eslint arrow-body-style: 0 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const openModalIngredient = (currentIngredientID: string) => ({
  type: OPEN_INGREDIENT,
  currentIngredient: currentIngredientID,
});

export const closeModalIngredient = (): TCloseIngredient => ({
  type: CLOSE_INGREDIENT,
});
