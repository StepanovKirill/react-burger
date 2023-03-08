import { TIngredient } from '../../utils/types';

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE' as const;
export const RESET_TOTAL_PRICE = 'RESET_TOTAL_PRICE' as const;
export const ADD_INGREDIENT = 'ADD_INGREDIENT' as const;
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT' as const;
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT' as const;
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS' as const;

export interface ISetTotalPrice {
  readonly type: typeof SET_TOTAL_PRICE;
  readonly totalPrice: number;
}

export interface IResetTotalPrice {
  readonly type: typeof RESET_TOTAL_PRICE;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly uid: string | undefined;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly sourceIndex: number;
  readonly targetIndex: number;
}

export interface IResetIngredients {
  readonly type: typeof RESET_INGREDIENTS;
}

export type TConstructorActions =
  | ISetTotalPrice
  | IResetTotalPrice
  | IAddIngredient
  | IDeleteIngredient
  | IMoveIngredient
  | IResetIngredients;

/* eslint arrow-body-style: 0 */
export const resetTotalPrice = (): IResetTotalPrice => {
  return {
    type: RESET_TOTAL_PRICE,
  };
};

export const setTotalPrice = (totalPrice: number): ISetTotalPrice => {
  return {
    type: SET_TOTAL_PRICE,
    totalPrice,
  };
};

export const addIngredient = (item: TIngredient, uid: string | undefined): IAddIngredient => {
  return {
    type: ADD_INGREDIENT,
    item: { ...item, uid },
  };
};

export const deleteIngredient = (uid: string | undefined): IDeleteIngredient => {
  return {
    type: DELETE_INGREDIENT,
    uid,
  };
};

export const moveIngredient = (sourceIndex: number, targetIndex: number): IMoveIngredient => {
  return {
    type: MOVE_INGREDIENT,
    sourceIndex,
    targetIndex,
  };
};

export const resetIngredients = (): IResetIngredients => {
  return {
    type: RESET_INGREDIENTS,
  };
};
