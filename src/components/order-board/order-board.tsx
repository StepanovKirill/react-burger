import React from "react";
import { useSelector } from "../../services/types/hooks";
import style from './order-board.module.css';

export const OrderBoard = () => {
  
  const { total, totalToday, orders } = useSelector((store) => store.feed)

  const doneOrders = orders.filter((item) => item.status === "done").slice(0, 10)
  const executeOrders = orders.filter((item) => item.status === "pending").slice(0, 10)
 
  return (
    <div className={style.wrapper}>
      <div className={style.status_container}>
        <div className={style.title_container}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={style.two_column}>
            {doneOrders?.map((item, index) => <li key={index} className={style.ready}>{item.number}</li>)}
          </ul>
        </div>
        <div className={style.title_container}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={style.two_column}>
            {executeOrders?.map((item, index) => <li key={index} className={style.execute}>{item.number}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={style.total}>{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={style.total}>{totalToday}</p>
      </div>
    </div>
  )
}