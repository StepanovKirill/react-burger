import React from 'react';
import style from'./menu-button.module.css'
import PropTypes from 'prop-types'

function MenuButton(props) {
  return (
    <div className={`${style.btn} ${props.className}`} onClick={props.onClick}>
        <div className={style.logo}>{props.children}</div>
        <p className={`text text_type_main-small ${style.text} ${props.active ? style.active : ''}`}>{props.text}</p>
    </div>
  );
}

MenuButton.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default MenuButton;
