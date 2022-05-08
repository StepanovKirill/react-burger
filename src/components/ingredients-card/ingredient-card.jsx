import React from 'react'
import {useSelector} from 'react-redux'
import {useDrag} from 'react-dnd'
import PropTypes from 'prop-types'
import ingredient from '../../utils/types'
import style from'./ingredient-card.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch} from 'react-redux'
import {openModalIngredient} from '../../services/actions/ingredients.js'

function IngredientCard(props) {
  const order = useSelector(store => store.constructor.ingredientsConstructor)

  const [, dragRef] = useDrag({
      type: 'ingredients',
      item: props.data
  })

  const dispatch = useDispatch()

  const openIngredientsDetail = (ingredient) => {
    dispatch(openModalIngredient(ingredient))
  }
  const count = order?.filter(item => item._id === props.data._id).length

  return (
    <div 
      className={style.container}
      onClick={() => {openIngredientsDetail(props.data._id)}} 
      ref={dragRef}
    >
      <div className={style.image_container}>
        <img src={props.data.image} alt={props.data.name} />
        <div className={style.counter}>
          {count > 0 && <Counter count={count} size="default" />}
        </div>
      </div>
      <div className={style.price_container}>
        <div className={style.price_value}>
          <p className="text text_type_digits-default">
            {props.data.price}
          </p>
        </div>
        <div className={style.icon}>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
      <div className={style.name_container}>
        <p className={`text text_type_main-small ${style.name_text}`}>{props.data.name}</p>
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  data: ingredient.isRequired,
}

export default IngredientCard;
