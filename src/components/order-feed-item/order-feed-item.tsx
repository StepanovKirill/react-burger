import React, {FC} from "react";
import { useSelector } from "../../services/types/hooks";
import style from './order-feed-item.module.css';
import { TOrder } from "../../utils/types";
import { IngredientIcon } from "../ingredient-icon/ingredient-icon";
import { formatData } from '../../utils/format-data';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from "react-router-dom";
import { Location } from 'history'

type TOrderFeedItem = {
  order: TOrder;
  id: string;
  isUserOrder: boolean;
};

const ordersStatus = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен'
}

export const OrderFeedItem: FC<TOrderFeedItem> = ({order, id, isUserOrder}) => {
  const location = useLocation<Location>();
  const { ingredients } = useSelector(store => store.ingredients)
  
  const orderIngredients = ingredients && order?.ingredients.map((item) => ingredients?.filter(allIngredientItem => allIngredientItem._id === item)[0])


  const totalPrice = React.useMemo(
    () =>
      orderIngredients ? 
      orderIngredients.reduce((sum, current) => sum + current.price, 0)
      : 0,
    [orderIngredients]
  );

  const showIngredients = orderIngredients?.slice(0, 4);
  const lastIngredient = orderIngredients?.slice(4,5)[0];
  const hiddenIngredientCount = orderIngredients.length > 5 ? orderIngredients.length - 5 : null;
  return (
    <Link
      to={{ pathname: `${location.pathname}/${id}`, state: { background: location } }}
      className={style.item_container}
    >
      <div className={style.info_container}>
        <div>
          <p className="text text_type_digits-default">
            #{order.number}
          </p>
        </div>
        <div className={style.date_container}>
          <p className="text text_type_main-default text_color_inactive">
            {formatData(order.createdAt)}
          </p>
        </div>  
      </div>
      <div className={`${style.title_container} text text_type_main-medium`}>
        {order.name}
        {isUserOrder && <p className={`${style.order_status} ${(order.status === 'done') && style.done}`}>{ordersStatus[order.status]}</p>}
      </div>
      <div className={style.ingredients_container}>
        <ul className={style.icons_container}>
          {hiddenIngredientCount && <IngredientIcon last count={hiddenIngredientCount} imageURL={lastIngredient.image_mobile}/>}
          {showIngredients.map((item, index) => 
            <IngredientIcon key={index} imageURL={item.image_mobile}/>
          )}
        </ul>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
};