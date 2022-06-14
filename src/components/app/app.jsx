import {useEffect, React} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import style from'./app.module.css'
import AppHeader from '../app-header/app-header.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from '../modal/modal'
import {getIngredients, closeModalIngredient} from '../../services/actions/ingredients.js'
import {closeModalOrder} from '../../services/actions/order.js'
import {LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage, IngredientPage} from '../../pages'
import ProtectedRoute from '../protected-route/protected-route'
import {getUser} from '../../services/actions/user'
import { getCookie } from '../../utils/cookie_handlers';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const background = location?.state?.background
  const {ingredients} = useSelector(store => store.ingredients)
  const {orderNumber} = useSelector(store => store.order)

  const closeIngredient = () => {
    dispatch(closeModalIngredient())
    history.goBack()
  }

  const closeOrder = () => {
    dispatch(closeModalOrder())
  }

  // загрузка данных при монтировании компонента
  useEffect(() => {
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
          <Modal onClose={closeOrder}>
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>
        }
    </div>
  );
};

export default App