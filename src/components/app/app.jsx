import {useEffect, React} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import style from'./app.module.css'
import AppHeader from '../app-header/app-header.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from '../modal/modal'
import {getIngredients, closeModalIngredient} from '../../services/actions/ingredients.js'
import {closeModalOrder} from '../../services/actions/order.js'


function App() {
  const dispatch = useDispatch();
  
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