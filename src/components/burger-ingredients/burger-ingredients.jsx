import {React, useState, useRef} from 'react'
import style from'./burger-ingredients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsTab from '../ingredients-tab/ingredients-tab.jsx'
import {useSelector} from 'react-redux'

function BurgerIngredients() {
  const {ingredients} = useSelector(store => store.ingredients)

  // стейт для таба
  const [current, setCurrent] = useState('bun')
  
  const refBun = useRef()
  const refMain = useRef()
  const refSauces = useRef()
  
  const scrollToElement = (value) => {
    setCurrent(value)
    switch (value) {
      case 'bun': {
        refBun.current.scrollIntoView({ behavior: 'smooth' })
        break
      }
      case 'main': {
        refMain.current.scrollIntoView({ behavior: 'smooth' })
        break
      }
      case 'sauce': {
        refSauces.current.scrollIntoView({ behavior: 'smooth' })
        break
      }
      default: {
        break
      }
    }
  }

  const focusCurrentTab = (e) => {
    if (e.target.scrollTop - refBun.current.offsetHeight <  0) {
      setCurrent('bun')
    } else if (e.target.scrollTop - refSauces.current.offsetHeight - refBun.current.offsetHeight < 0) {
      setCurrent('sauce')
    } else {
      setCurrent('main')
    }
  }

  return (
  <section className={style.container}>
    <div className={style.title_container}>
      <p className={`text text_type_main-large ${style.title_text}`}>Соберите бургер</p>
    </div>
    <div className={style.tab}>
      <Tab value="bun" active={current === 'bun'} onClick={scrollToElement}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={scrollToElement}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={scrollToElement}>
        Начинки
      </Tab>
  </div>
  <div className={style.scrolled} onScroll={focusCurrentTab}>
    <IngredientsTab key='1' ingredients={ingredients.filter((item) => item.type === 'bun')} name='bun' ref={refBun}/>
    <IngredientsTab key='3' ingredients={ingredients.filter((item) => item.type === 'sauce')} name='sauce' ref={refSauces}/>
    <IngredientsTab key='2' ingredients={ingredients.filter((item) => item.type === 'main')} name='main' ref={refMain}/>
  </div>
  </section>
  );
}

export default BurgerIngredients;