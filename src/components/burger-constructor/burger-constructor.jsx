import React from 'react';
import style from'./burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import ingredient from '../../utils/types';

function BurgerConstructor(props) {
  return (
    <div className={style.container}>
      {props.composition.filter((item) => item.type === 'bun')
        .map((item) => (<ConstructorItem key={item._id} data={item} class='first'/>))}
      <div className={style.main}>
        <div className={style.scrolled}>
        {props.composition.filter((item) => item.type !== 'bun')
          .map((item) => (<ConstructorItem key={item._id} data={item} class='main'/>))}
        </div>
      </div>
      {props.composition.filter((item) => item.type === 'bun')
  .map((item) => (<ConstructorItem key={item._id} data={item} class='last'/>))}
      <div className={style.total_container}>
        <div className={style.price_value}>
          <p className="text text_type_digits-medium">610</p>
        </div>
        <div className={style.currency_container}>
          <CurrencyIcon/>
        </div>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  composition: PropTypes.arrayOf(ingredient).isRequired
}

export default BurgerConstructor;
