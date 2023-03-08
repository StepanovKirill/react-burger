import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import store from '../store';

import { TConstructorActions } from '../actions/constructor';
/* eslint import/no-cycle: 0 */
import { TUserActions } from '../actions/user';
import { TOrderActions } from '../actions/order';
import { TIngredientsActions } from '../actions/ingredients';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TConstructorActions | TIngredientsActions | TUserActions | TOrderActions;

export type AppThunk = ActionCreator<ThunkAction<void, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch; // & ThunkDispatch<RootState, null, AnyAction>;
