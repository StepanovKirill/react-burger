import {React, useState, useContext} from 'react';
import ingredient from '../../utils/types';
import PropTypes from 'prop-types'
import style from'./burger-ingredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsTab from '../ingredients-tab/ingredients-tab.jsx'
import {IngredientsContext} from '../../services/contexts/ingredients-context.js'

function BurgerIngredients({onModalOpen}) {
  const ingredients = useContext(IngredientsContext).ingredients

  // стейт для таба
  const [current, setCurrent] = useState('bun')

  return (
    <section className={style.container}>
      <div className={style.title_container}>
        <p className={`text text_type_main-large ${style.title_text}`}>Соберите бургер</p>
      </div>
      <div className={style.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div className={style.scrolled}>
      <IngredientsTab key='1' ingredients={ingredients.filter((item) => item.type === 'bun')} name='bun' onModalOpen={onModalOpen}/>
      <IngredientsTab key='3' ingredients={ingredients.filter((item) => item.type === 'sauce')} name='sauce' onModalOpen={onModalOpen} />
      <IngredientsTab key='2' ingredients={ingredients.filter((item) => item.type === 'main')} name='main' onModalOpen={onModalOpen}/>
    </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;