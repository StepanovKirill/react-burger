import React from 'react';
import style from './order-page.module.css';
import { useRouteMatch, useParams } from 'react-router-dom';
import { Order } from '../../components/order/order';
import { useDispatch, useSelector } from '../../services/types/hooks';
import {
  wsConnectionClosedOrdersAction,
  wsConnectionClosedOrdersUserAction,
  wsConnectionStartOrdersAction,
  wsConnectionStartOrdersUserAction
  } from '../../services/actions/feed';

export const OrderPage: React.FC = () => {
  const dispatch = useDispatch();
  
  const isUserOrders = useRouteMatch({ path: "/profile/orders/" });

  const [orderNumber, setOrderNumber] = React.useState<number | null | undefined>(undefined)

  const { id } = useParams<{id: string}>()

  const allOrders = useSelector(store => store.feed.orders)
  const userOrders = useSelector(store => store.feed.userOrders)

  const isFeedOrder = useRouteMatch({path: '/order-feed'})
  const feedOrderNumber = isFeedOrder && allOrders && allOrders.find(item => item._id === id)?.number

  const isProfileOrders = useRouteMatch({path: '/profile/orders'})
  const profileOrderNumber = isProfileOrders && userOrders && userOrders.find(item => item._id === id)?.number
  
  console.log(id, isProfileOrders, userOrders, profileOrderNumber )

  React.useEffect(
    () => {
      dispatch(isUserOrders ? wsConnectionStartOrdersUserAction() : wsConnectionStartOrdersAction());
      feedOrderNumber ? setOrderNumber(feedOrderNumber) : setOrderNumber(profileOrderNumber);
        return () => {
        dispatch(isUserOrders ? wsConnectionClosedOrdersUserAction() : wsConnectionClosedOrdersAction());
      };
    }, [profileOrderNumber, feedOrderNumber]
  );
    
  return (
    <main className={style.wrapper}>
      <p className={style.title}># {orderNumber}</p>
      <Order />
    </main>
  )
}