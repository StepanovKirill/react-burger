import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients-reducer.js';
import {orderReducer} from './order-reducer.js';
import {constructorReducer} from './constructor-reducer.js'
import {userReducer} from './user-reducer.js';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructor: constructorReducer,
  user: userReducer,
});