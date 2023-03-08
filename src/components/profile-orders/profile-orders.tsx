import React from 'react';
import { v4 as uuid } from 'uuid';

import style from './profile-orders.module.css';
import OrderFeedItem from '../order-feed-item/order-feed-item';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { wsConnectionStartOrdersUserAction, wsConnectionClosedOrdersUserAction } from '../../services/actions/feed';

export default function ProfileOrders(): JSX.Element {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((store) => store.feed);

  React.useEffect(() => {
    dispatch(wsConnectionStartOrdersUserAction());
    return () => {
      dispatch(wsConnectionClosedOrdersUserAction());
    };
  }, [dispatch]);

  const orders = React.useMemo(
    () => userOrders?.map((item) => <OrderFeedItem isUserOrder id={item._id} key={uuid()} order={item} />),
    [userOrders],
  );

  return (
    <section>
      <ul className={style.scrolled}>{orders}</ul>
    </section>
  );
}
