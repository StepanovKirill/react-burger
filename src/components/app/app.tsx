import * as React from 'react';
import { Location } from 'history';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { getIngredients, closeModalIngredient } from '../../services/actions/ingredients';
import { closeModalOrder } from '../../services/actions/order';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  OrderPage,
  ProfilePage,
  NotFoundPage,
  IngredientPage,
  OrderFeedPage,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie_handlers';
import { useSelector, useDispatch } from '../../services/types/hooks';
import Order from '../order/order';

function App(): JSX.Element {
  const dispatch = useDispatch();

  const location = useLocation<{ background: Location | undefined }>();
  const history = useHistory<History>();

  // background — is background page under modal window
  const background = location?.state?.background;

  const { ingredients } = useSelector((store) => store.ingredients);
  const { orderNumber } = useSelector((store) => store.order);

  const closeIngredient = React.useCallback(() => {
    dispatch(closeModalIngredient());
    history.goBack();
  }, [history, dispatch]);

  const closeOrder = React.useCallback(() => {
    dispatch(closeModalOrder());
  }, [dispatch]);

  // loading ingredients and login if user already logged
  React.useEffect(() => {
    dispatch(getIngredients());

    if (localStorage.getItem('refreshToken') && getCookie('token')) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <div className={style.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <Route path="/order-feed/:id" exact>
          <OrderPage />
        </Route>
        <Route path="/order-feed">
          <OrderFeedPage />
        </Route>
        <Route path="/" exact>
          {ingredients && (
            <main className={style.main}>
              <div className={style.container}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </div>
            </main>
          )}
        </Route>
        <Route path="/*" exact>
          <NotFoundPage />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={closeIngredient} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/order-feed/:id">
          <Modal onClose={closeIngredient} title="">
            <Order />
          </Modal>
        </Route>
      )}
      {background && (
        <ProtectedRoute path="/profile/orders/:id">
          <Modal onClose={closeIngredient} title="">
            <Order />
          </Modal>
        </ProtectedRoute>
      )}
      {orderNumber && (
        <Modal onClose={closeOrder} title="">
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}

export default App;
