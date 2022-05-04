import {React, useEffect, useContext, useReducer, useMemo} from 'react';
import style from'./burger-constructor.module.css'
import {CurrencyIcon, Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import {OrderContext} from '../../services/contexts/order-context.js'

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

function calculateTotalPrice(order) {
  return order.reduce((sum, item) => {
    if (item.type === 'bun') {
      return sum + 2 * item.price
    }
    return sum + item.price
  }, 0)
}

const BurgerConstructor = ({onModalOpen}) => {
  const order = useContext(OrderContext).order
  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState)
  const totalPrice = useMemo(() => calculateTotalPrice(order), [order])

  const bunIngredients = order.filter((item) => item.type === 'bun')
  const otherIngredients = order.filter((item) => item.type !== 'bun')

  useEffect(() => {
    if (order) {
      totalPriceDispatcher({ type: "set", totalPrice: totalPrice});
    } else {
      totalPriceDispatcher({ type: "reset" });
    }
  }, []);

  return (
    <section className={style.container}>
      {bunIngredients.map((item) => (
        <div className={`${style.item_container} pl-8`}>
          <ConstructorElement
            key={item._id}
            text={item.name + "\n(верх)"}
            type='top'
            isLocked={true}
            price={item.price}
            thumbnail={item.image}
          />
        </div>))}
      <div className={style.main}>
        <div className={style.scrolled}>
        {otherIngredients.map((item) => (
          <div className={style.item_container}>
            <div className={style.drag}>
              <DragIcon/>
            </div>
            <ConstructorElement
              key={item._id}
              text={item.name}
              isLocked={false}
              price={item.price}
              thumbnail={item.image}
            />
          </div>))}
        </div>
      </div>
      {bunIngredients.map((item) => (
        <div className={`${style.item_container} pl-8`}>
          <ConstructorElement
            key={item._id}
            text={item.name + "\n(низ)"}
            type='bottom'
            isLocked={true}
            price={item.price}
            thumbnail={item.image}
          />
        </div>))}
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