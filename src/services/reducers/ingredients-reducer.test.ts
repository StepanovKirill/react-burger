import { ingredientsReducer, ingredientsInitialState } from './ingredients-reducer';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT,
  TIngredientsActions,
} from '../actions/ingredients';

import { ingredients } from '../../utils/fake_data';

describe('Тест редьюсера ингредиентов', () => {
  it('возвращение начального состояния', () => {
    expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(ingredientsInitialState);
  });
  it('запрос ингредиентов GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ...ingredientsInitialState,
      ingredientsRequest: true,
    });
  });
  it('успешно выполнен запрос ингредиентов GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_SUCCESS, ingredients })).toEqual({
      ...ingredientsInitialState,
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredients,
    });
  });
  it('запрос ингредиентов не выполнен GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ...ingredientsInitialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
  it('открытие модалки с ингредиентом OPEN_INGREDIENT', () => {
    expect(ingredientsReducer(undefined, { type: OPEN_INGREDIENT, currentIngredient: ingredients[0] })).toEqual({
      ...ingredientsInitialState,
      currentIngredient: ingredients[0],
    });
  });
  it('закрытие модалки с ингредиентов CLOSE_INGREDIENT', () => {
    expect(ingredientsReducer(undefined, { type: CLOSE_INGREDIENT })).toEqual(ingredientsInitialState);
  });
});
