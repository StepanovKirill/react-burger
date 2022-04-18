import React from 'react';
import PropTypes from "prop-types";
import style from'./ingredient-card.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


function IngredientCard(props) {

  console.log(props)
  return (
    <div className={style.container}>
      <div className={style.image_container}>
        <img src={props.data.image} alt={props.data.name} />
        <div className={style.counter}>
          {props.count > 0 && <Counter count={props.count} size="default" />}
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
  data: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    image: PropTypes.string
  }),
  count: PropTypes.number
}

export default IngredientCard;
