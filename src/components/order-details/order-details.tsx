import React from 'react';
import style from './order-details.module.css';
import { ReactComponent as DoneIcon } from '../../images/done.svg';

const OrderDetails: React.FC<{ orderNumber: number }> = ({ orderNumber }) => (
  <>
    <div className={style.order_id_container}>
      <p className={`text text_type_digits-large ${style.order_id}`}>{orderNumber}</p>
    </div>
    <div className={style.popup_text}>
      <p className="text text_type_main-medium">идентификатор заказа</p>
    </div>
    <div className={style.done_icon}>
      <DoneIcon />
    </div>
    <div className={style.popup_text}>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
    </div>
    <div className={`mb-30 ${style.popup_text}`}>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  </>
);

export default OrderDetails;
