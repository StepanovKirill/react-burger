import {React, useState} from 'react';
import style from'./burger-ingredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsTab from '../ingredients-tab/ingredients-tab.jsx'
import data from '../../utils/data.js'

function BurgerIngredients() {
  // стейт для таба
  const [current, setCurrent] = useState('bun')

  // стейт для ингредиентов и счетчика
  const [ingredients, setIngredients] = useState(groupData(data))
  console.log(ingredients.bun)
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
      <IngredientsTab key='1' data={ingredients.bun} name='bun' />
      <IngredientsTab key='3' data={ingredients.sauce} name='sauce' />
      <IngredientsTab key='2' data={ingredients.main} name='main' />
    </div>
    </section>
  );
}

function groupData(data) {
  // группирует данные по типам: булки, соусы, начинки

  let res = {bun: [], sauce: [], main: []}
  data.forEach((item) => {res[item['type']].push({...item, 'count': 1})})
  return res
}

export default BurgerIngredients;