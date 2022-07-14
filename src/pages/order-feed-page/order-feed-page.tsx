import React from 'react';
import style from'./order-feed-page.module.css';
import { OrderFeedItem } from '../../components/order-feed-item/order-feed-item'
import { OrderBoard } from '../../components/order-board/order-board';
import { useDispatch, useSelector } from '../../services/types/hooks';
import {
    wsConnectionClosedOrdersAction,
    wsConnectionStartOrdersAction,
  } from '../../services/actions/feed';

export const OrderFeedPage: React.FC = () =>  {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.feed);

  React.useEffect(
      () => {
          dispatch(wsConnectionStartOrdersAction());
              return () => {
              dispatch(wsConnectionClosedOrdersAction());
          };
      }, [dispatch],
  );
  
  return (
  <main className={style.wrapper}>
    <div className={style.container}>
    <div className={style.title_container}>
      <p className={`text text_type_main-large ${style.title_text}`}>Лента заказов</p>
    </div>
    <div className={style.two_column}>
      <ul className={style.scrolled}>
        {orders.map((item, index) => <OrderFeedItem isUserOrder={false} id={item._id} key={index} order={item}/>)}
      </ul>
      <section className={style.board}>
        <OrderBoard />
      </section>
    </div>
    </div>
  </main>
  );
};