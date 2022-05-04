import {useState, useEffect, React} from 'react';
import style from'./app.module.css'
import AppHeader from '../app-header/app-header.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from '../modal/modal'
import {getIngredients, postOrder} from '../../utils/fetch_api.js'
import {IngredientsContext} from '../../services/contexts/ingredients-context.js'
import {OrderContext} from '../../services/contexts/order-context.js'

function checkIngredients(array) {
  let oneBun = false
  return (array.filter((item) => {
    if (item.type === 'bun' && !oneBun) {
      oneBun = true
      return item
    }
    if (item.type !== 'bun') {
      return item
    }
  }))
}

function App() {

  // стейт для ингредиентов
  const [ingredients, setIngredients] = useState([])

  // стейт для собранного бургера
  const [order, setOrder] = useState([])

  const [isLoad, setIsLoad] = useState(true)
  const [error, setError] = useState(null)

  // стейт на модалки
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState('')
  const [currentIngredient, setCurrentIngredient] = useState({})
  const [orderNumber, setOrderNumber] = useState(null)

  const openModalOrderDetails = () => {
    setIsModalOpen(true);
    setCurrentModal('orderDetails');
    postOrder(order.map((item) => item._id))
      .then(data => {setOrderNumber(data.order.number)})
      .catch(e => {console.error(e)}
    )
  }

  const openModalIngredientDetails = (id) => {
    if (ingredients) {
      setCurrentIngredient(ingredients.find(ingredient => ingredient._id === id));
    }
    setIsModalOpen(true);
    setCurrentModal('ingredientDetails');
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // загрузка данных при монтировании компонента
  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data.data);
      setOrder(checkIngredients([...data.data]));
      setIsLoad(false)
    })
    .catch(e => {
      setIsLoad(null)
      setError(e)
  })}, []);

  return (
    <div className={style.app}>
      <AppHeader />
      {isLoad === false &&
      <main className={style.main}>
        <div className={style.container}>
            <IngredientsContext.Provider value={{ingredients, setIngredients}}>
              <BurgerIngredients onModalOpen={openModalIngredientDetails} />
            </IngredientsContext.Provider>
            <OrderContext.Provider value={{order, setOrder}}>
              <BurgerConstructor onModalOpen={openModalOrderDetails} />
            </OrderContext.Provider>
        </div>
      </main>
      }

      { isLoad === true &&
      <div className={style.message}>
        <p className='text text_type_main-large'>Загрузка...</p>
      </div>
      }

      { error &&
      <div className={style.message}>
        <p className='text text_type_main-large'>Ошибка загрузки данных</p>
      </div>
      }

      <div id='modal'>
      { isModalOpen && currentModal === 'ingredientDetails' &&
          <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>
      }
      { isModalOpen && currentModal === 'orderDetails' &&
          <Modal onClose={closeModal}>
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>
      }
      </div>
    </div>
  );
};

export default App