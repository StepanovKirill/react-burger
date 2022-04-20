import React from "react";
import PropTypes from 'prop-types'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './popup.module.css';

function Popup(props){
  return (
    <div className={style.container}>
      <div className={style.blur}></div>
      <div className={style.popup_container}>
        <div className={style.title_container}>
          <p className={`text text_type_main-large ${style.title}`}>
            {props.title}
          </p>
          <div className={style.icon_container}>
            <CloseIcon type="primary" onClick={props.close}/>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func.isRequired
}

export default Popup