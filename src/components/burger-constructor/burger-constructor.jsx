import {React, useEffect, useContext, useReducer} from 'react';
import style from'./burger-constructor.module.css'
import ConstructorItem from '../constructor-item/constructor-item';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
//import ingredient from '../../utils/types'
import {OrderContext} from '../../context/order-context.js'

const totalPriceInitialState = { totalPrice: 0 }

function totalPriceReducer(state, action) {
  
  switch (action.type) {
    case "set":
      return { totalPrice: action.totalPrice };
    case "reset":
      return totalPriceInitialState;
    default:
      throw new Error(action.type);
  }
}

const BurgerConstructor = ({onModalOpen}) => {
  const order = useContext(OrderContext).order
  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState)

  const calculateTotalPrice = () => {
    return order.reduce((sum, item) => {
      if (item.type === 'bun') {
        return sum + 2 * item.price
      }
      return sum + item.price
    }, 0)
  }

  useEffect(() => {
    if (order) {
      totalPriceDispatcher({ type: "set", totalPrice: calculateTotalPrice()});
    } else {
      totalPriceDispatcher({ type: "reset" });
    }
  }, [order]);

  return (
    <section className={style.container}>
      {order.filter((item) => item.type === 'bun')
        .map((item) => (<ConstructorItem key={item._id} data={item} class='first'/>))}
      <div className={style.main}>
        <div className={style.scrolled}>
        {order.filter((item) => item.type !== 'bun')
          .map((item) => (<ConstructorItem key={item._id} data={item} class='main'/>))}
        </div>
      </div>
      {order.filter((item) => item.type === 'bun')
        .map((item) => (<ConstructorItem key={item._id} data={item} class='last'/>))}
      <div className={style.total_container}>
        <div className={style.price_value}>
          <p className="text text_type_digits-medium">{totalPriceState.totalPrice}</p>
        </div>
        <div className={style.currency_container}>
          <CurrencyIcon/>
        </div>
        <Button type="primary" size="large" onClick={onModalOpen}>Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
}

export default BurgerConstructor;