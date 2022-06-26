import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Location } from "history";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import style from'./app.module.css';
import AppHeader from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { getIngredients, closeModalIngredient} from '../../services/actions/ingredients';
import { closeModalOrder } from '../../services/actions/order';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage, IngredientPage } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie_handlers';

const App = () => {

  // TODO: hook useDispatch typing
  const dispatch = useDispatch()

  const location = useLocation<{ background: Location | undefined }>()
  const history = useHistory<History>()

  // background — is background page under modal window
  const background = location?.state?.background

  // TODO: store typing
  const { ingredients } = useSelector<any, any>(store => store.ingredients)
  const { orderNumber } = useSelector<any, any>(store => store.order)

  const closeIngredient = () => {
    dispatch(closeModalIngredient())
    history.goBack()
  }

  const closeOrder = () => {
    dispatch(closeModalOrder())
  }

  // loading ingredients and login if user already logged
  React.useEffect(() => {
    dispatch(getIngredients())
    
    if (localStorage.getItem('refreshToken') && getCookie('token')) {
      dispatch(getUser())
    }
  }, [dispatch]);
  return (
    <div className={style.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <Route path='/ingredients/:id'>
          <IngredientPage/>
        </Route>
        < Route path="/" exact>
          {ingredients &&
            <main className={style.main}>
              <div className={style.container}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </div>
            </main>
          }
        </Route>
        <Route path='/*' exact>
          <NotFoundPage/>
        </Route>
      </Switch>
        {background &&
          <Route path='/ingredients/:id'>
            <Modal onClose={closeIngredient} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>
        }
        {orderNumber &&
          <Modal onClose={closeOrder} title=''>
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>
        }
    </div>
  );
};

export default App