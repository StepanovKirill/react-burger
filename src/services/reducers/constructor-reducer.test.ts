import { TConstructorActions, 
  RESET_TOTAL_PRICE,
  SET_TOTAL_PRICE,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_INGREDIENTS } from '../actions/constructor';
import { constructorReducer, constructorInitialState } from './constructor-reducer'
import { ingredients } from "../../utils/fake_data"

describe("Тестируем редьюсер конструктора", () => {
  it("начальное состояние", () => {
    expect(constructorReducer(undefined, {} as TConstructorActions))
    .toEqual(constructorInitialState);
  });
  it("определение цены заказа", () => {
    expect(constructorReducer(constructorInitialState, {type: SET_TOTAL_PRICE, totalPrice: 42}))
    .toEqual({...constructorInitialState, totalPrice: 42})
  });
  it("сброс цены заказа", () => {
    expect(constructorReducer(constructorInitialState, {type: RESET_TOTAL_PRICE}))
    .toEqual({...constructorInitialState})
  });
  it("добавление ингредиента в заказ", () => {
    expect(constructorReducer(constructorInitialState, {type: ADD_INGREDIENT, item: ingredients[0]}))
    .toEqual({...constructorInitialState, ingredientsConstructor: [ingredients[0], ingredients[0]]})
  })
  it("удаление ингредиента", () => {
    const ingredientsConstructor = ingredients;
    const result = ingredientsConstructor;
    const deletedIngredient = ingredientsConstructor.splice(3,1)[0];
  
    expect(constructorReducer({...constructorInitialState, ingredientsConstructor}, {type: DELETE_INGREDIENT, uid: deletedIngredient.uid}))
    .toEqual({...constructorInitialState, ingredientsConstructor: result});
  })
  it("перетаскивание ингридиента в конструкторе", () => { 
    const ingredientsConstructor = ingredients;
    const result = [...ingredientsConstructor];
    result[3] = result.splice(2,1, result[3])[0]
    expect(constructorReducer({...constructorInitialState, ingredientsConstructor}, {type: MOVE_INGREDIENT, sourceIndex: 1, targetIndex: 0}))
    .toEqual({...constructorInitialState, ingredientsConstructor: result});
  })
  it("сброс ингредиентов в конструкторе", () => {
    const ingredientsConstructor = ingredients;
    expect(constructorReducer({...constructorInitialState, ingredientsConstructor}, {type: RESET_INGREDIENTS})).toEqual(constructorInitialState)
  })
});


