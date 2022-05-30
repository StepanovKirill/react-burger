import {useEffect, React} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Switch, useLocation} from 'react-router-dom';
import style from'./app.module.css'
import AppHeader from '../app-header/app-header.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from '../modal/modal'
import {getIngredients, closeModalIngredient} from '../../services/actions/ingredients.js'
import {closeModalOrder} from '../../services/actions/order.js'
import {LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage} from '../../pages'

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const {ingredients, ingredientsRequest, ingredientsFailed, currentIngredient} = useSelector(store => store.ingredients)
  const {orderNumber} = useSelector(store => store.order)
  const closeIngredient = () => {
    dispatch(closeModalIngredient());
  };

  const closeOrder = () => {
    dispatch(closeModalOrder())
  }

  // загрузка данных при монтировании компонента
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
    <div className={style.app}>
      <AppHeader />
      <Switch location={location}>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <Route path="/" exact>
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
      {ingredientsRequest === true &&
      <div className={style.message}>
        <p className='text text_type_main-large'>Загрузка...</p>
      </div>
      }

      {ingredientsFailed &&
      <div className={style.message}>
        <p className='text text_type_main-large'>Ошибка загрузки данных</p>
      </div>
      }

      <div id='modal'>
      {currentIngredient &&
          <Modal onClose={closeIngredient} title="Детали ингредиента">
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>
      }
      {orderNumber &&
          <Modal onClose={closeOrder}>
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>
      }
      </div>
    </div>
  );
};

export default App