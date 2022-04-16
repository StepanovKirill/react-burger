import React from 'react';
import style from'./menu-button.module.css'

function MenuButton(props) {
  return (
    <div className={`${style.btn} ${props.className}`} onClick={props.onClick}>
        <div className={style.logo}>{props.children}</div>
        <p className={`text text_type_main-small ${style.text} ${props.active ? style.active : ''}`}>{props.text}</p>
    </div>
  );
}

export default MenuButton;
