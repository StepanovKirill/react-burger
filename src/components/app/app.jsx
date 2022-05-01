import {useState, useEffect, React} from 'react';
import style from'./app.module.css'
import AppHeader from '../app-header/app-header.jsx'
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx'
import OrderDetails from '../order-details/order-details.jsx'
import Modal from '../modal/modal';
import data from '../../utils/data.js'

function App() {
  // стейт для ингредиентов
  const [ingredients, setIngredients] = useState([])
  // стейт для собранного бургера
  const [composition, setComposition] = useState([])
  const [isLoad, setIsLoad] = useState(true)
  // стейт на модалки
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState('')
  const [currentIngredient, setCurrentIngredient] = useState({})

  const openModalOrderDetails = () => {
    setIsModalOpen(true);
    setCurrentModal('orderDetails');
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
  const URL = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    fetch(URL)
    .then(resp => {
      if (resp.ok) {
          return resp.json();
      }
      return Promise.reject(resp.status);
    })
    .then((data) => {
      setIngredients(data.data);
      setComposition([data.data[0],data.data[3],data.data[2], data.data[4], data.data[5]]);
      setIsLoad(false)
    })
    .catch(e => {
      setIsLoad(null);
      setTimeout(() => {
        setIngredients(data);
        setComposition([data[0],data[3],data[2], data[4], data[5],data[6],data[7]]);
        setIsLoad(false)},3000);
  })}, []);

  return (
    <div className={style.app}>
      <AppHeader />
      {isLoad === false &&
      <main className={style.main}>
        <div className={style.container}>
          <BurgerIngredients ingredients={ingredients} onModalOpen={openModalIngredientDetails} />
          <BurgerConstructor composition={composition} onModalOpen={openModalOrderDetails} />
        </div>
      </main>}
      {isLoad === true &&
      <div className={style.message}>
        <p className='text text_type_main-large'>Загрузка...</p>
      </div>}
      {isLoad === null &&
      <div className={style.message}>
        <p className='text text_type_main-large'>Ошибка загрузки данных, переключаю на захардкоженные данные</p>
      </div>}

      <div id='modal'>
      { isModalOpen && currentModal === 'ingredientDetails' &&
          <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>
      }
      { isModalOpen && currentModal === 'orderDetails' &&
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
      }
      </div>
    </div>
  );
};

export default App