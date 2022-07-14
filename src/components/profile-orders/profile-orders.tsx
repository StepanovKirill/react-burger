import React from 'react'
import { useSelector, useDispatch } from '../../services/types/hooks';
import style from './profile-orders.module.css';
import { OrderFeedItem } from '../order-feed-item/order-feed-item';
import { wsConnectionStartOrdersUserAction, wsConnectionClosedOrdersUserAction} from '../../services/actions/feed';


export function ProfileOrders() {
  const dispatch = useDispatch()
  const { userOrders } = useSelector((store) => store.feed)
  
  console.log(userOrders)
  React.useEffect(
    () => {
      dispatch(wsConnectionStartOrdersUserAction());
        return () => {
        dispatch(wsConnectionClosedOrdersUserAction());
      };
    }, []
  );

  return (
  <section>
    <ul className={style.scrolled}>
      {userOrders.map((item, index) => <OrderFeedItem isUserOrder id={item._id} key={index} order={item}/>)}
    </ul>
  </section>
  )
}