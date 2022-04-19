import React from "react";
import style from './order-accepted-popup.module.css'
import Popup from "../../hoc/popup/popup";
import {ReactComponent as DoneIcon} from '../../images/done.svg'

function OrderAcceptedPopup(props) {
  return (
    <Popup close={props.close}>
      <div className={style.order_id_container}>
          <p className={`text text_type_digits-large ${style.order_id}`}>
            12390
          </p>
        </div>
        <div className={style.popup_text}>
          <p className="text text_type_main-medium">
            идентификатор заказа
          </p>
        </div>
        <div className={style.done_icon}>
          <DoneIcon />
        </div>
        <div className={style.popup_text}>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
        </div>
        <div className={`mb-30 ${style.popup_text}`}>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
    </Popup>
    )
}

export default OrderAcceptedPopup