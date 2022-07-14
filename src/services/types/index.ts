import { store } from '../store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TConstructorActions } from '../actions/constructor';
import { TIngredientsActions } from '../actions/ingredients';
import { TUserActions } from '../actions/user';
import { TOrderActions } from '../actions/order';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TConstructorActions | TIngredientsActions | TUserActions | TOrderActions;

export type AppThunk = ActionCreator<
  ThunkAction<void, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;// & ThunkDispatch<RootState, null, AnyAction>;