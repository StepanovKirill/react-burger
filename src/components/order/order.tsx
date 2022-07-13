import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRouteMatch, useParams} from "react-router";
import { useSelector } from "../../services/types/hooks";
import { formatData } from "../../utils/format-data";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import style from './order.module.css';

const ordersStatus = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен'
}

export const Order: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const allIngredients = useSelector(store => store.ingredients.ingredients)
  const { orders, userOrders } = useSelector((store) => store.feed)
 
  const isUserOrder = useRouteMatch('/profile/orders')
  
  const order = orders && orders.find((item) => item._id === id)
  const userOrder = isUserOrder && userOrders.find((item) => item._id === id)
  const currentOrder = isUserOrder ? userOrder : order

  const orderIngredientsAll = allIngredients && currentOrder && currentOrder?.ingredients.map((item) => allIngredients?.filter(allIngredientItem => allIngredientItem._id === item)[0])
  const orderIngredients = allIngredients && allIngredients.filter((item) => currentOrder?.ingredients.includes(item._id))

  const totalPrice = React.useMemo(
    () =>
    allIngredients && orderIngredientsAll ? 
    orderIngredientsAll.reduce((sum, current) => sum + current?.price, 0)
      : 0,
    [orderIngredientsAll, allIngredients]
  );

  return (
    <div className={style.wrapper}>
      <div className='text text_type_main-medium mb-15'>
        {currentOrder && currentOrder.name}
        {isUserOrder && <p className={`${style.order_status} ${(currentOrder?.status === 'done') && style.done}`}>{currentOrder && ordersStatus[currentOrder.status]}</p>}
      </div>
      <div className='text text_type_main-medium mb-3'>
        Состав:
      </div>
      {orderIngredients && orderIngredients.length > 0 && <ul className={style.scrolled}>
        {orderIngredients.map((item, index) => 
        <li key={index} className={style.ingredient}>
          <div className={style.icon}>
            <IngredientIcon imageURL={item.image_mobile} />
            <p className='text text_type_main-default ml-9'>{item.name}</p>
          </div>
          <div className={`${style.price} text text_type_digits-default`}>
            <div className="mr-2">
              {orderIngredientsAll && orderIngredientsAll.reduce((total_count, orderIngredient) => item._id === orderIngredient._id ? total_count +=1 : total_count, 0)}
              {' x '}
              {item.price}
            </div>
            <CurrencyIcon type='primary'/>
          </div>
        </li>)}
      </ul>}
      <div className={style.total_price_container}>
        <div className="text text_type_main-default text_color_inactive">
          {order && formatData(order.createdAt)}
        </div>
        <div className={style.total_price}>
          {`${totalPrice} `}<CurrencyIcon  type='primary'/>
        </div>
      </div>
    </div>
  )
}