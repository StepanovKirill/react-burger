import React from 'react'
import {useSelector} from 'react-redux'
import {useDrag} from 'react-dnd'
import PropTypes from 'prop-types'
import ingredient from '../../utils/types'
import style from'./ingredient-card.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch} from 'react-redux'
import {openModalIngredient} from '../../services/actions/ingredients.js'

function IngredientCard({ingredient}) {
  const order = useSelector(store => store.constructor.ingredientsConstructor)

  const [, dragRef] = useDrag({
      type: 'ingredients',
      item: ingredient
  })

  const dispatch = useDispatch()

  const openIngredientsDetail = (ingredient) => {
    dispatch(openModalIngredient(ingredient))
  }
  const count = order?.filter(item => item._id === ingredient._id).length

  return (
    <div 
      className={style.container}
      onClick={() => {openIngredientsDetail(ingredient._id)}} 
      ref={dragRef}
    >
      <div className={style.image_container}>
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={style.counter}>
          {count > 0 && <Counter count={count} size="default" />}
        </div>
      </div>
      <div className={style.price_container}>
        <div className={style.price_value}>
          <p className="text text_type_digits-default">
            {ingredient.price}
          </p>
        </div>
        <div className={style.icon}>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
      <div className={style.name_container}>
        <p className={`text text_type_main-small ${style.name_text}`}>{ingredient.name}</p>
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredient.isRequired,
}

export default IngredientCard;
