import React from 'react';
import ingredient from '../../utils/types';
import PropTypes from 'prop-types'
import style from'./constructor-item.module.css'
import {CurrencyIcon, LockIcon, DragIcon, DeleteIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function ConstructorItem(props) {
  return (
    <div className={style.container_}>
      <div className={style.icon}>
        {props.class === 'main' && (<DragIcon type="primary" />)}
      </div>
      <div className={(props.class === 'main') ? style.container : (props.class === 'first') ? style.first : style.last}>
        <div className={style.ingredient_icon}>
          <img src={props.data.image_mobile} alt={props.data.name} />
      </div>
      <div className={style.text_container}>
        <p className={`text text_type_main-medium ${style.text}`}>
          {`${props.data.name} \n ${props.class === 'first' ? '(верх)' : props.class === 'last' ? '(низ)' : ''}`}
        </p>
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
      <div className={style.status_icon}>
        {props.class === 'main' ? (<DeleteIcon type="primary" />) : (<LockIcon type="secondary" />)}
      </div>
    </div>
    </div>
  )
}

ConstructorItem.propTypes = {
  data: ingredient.isRequired,
  class: PropTypes.string.isRequired
}

export default ConstructorItem
