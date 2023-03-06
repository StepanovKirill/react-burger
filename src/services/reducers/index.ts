/* eslint import/no-cycle: 0 */
import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { orderReducer } from './order-reducer';
import { constructorReducer } from './constructor-reducer';
import { userReducer } from './user-reducer';
import { feedOrdersReducer } from './feed-reducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructor: constructorReducer,
  user: userReducer,
  feed: feedOrdersReducer,
});

export default rootReducer;
