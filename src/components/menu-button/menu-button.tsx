import React from 'react';
import style from './menu-button.module.css';

type TMenuButtonProps = {
  className?: string;
  children: React.ReactElement;
  active: boolean | undefined;
  text: string;
};

const MenuButton: React.FunctionComponent<TMenuButtonProps> = ({ className, children, active, text }) => (
  <div className={`${style.btn} ${className}`}>
    <div className={style.logo}>{children}</div>
    <p className={`text text_type_main-small ${style.text} ${active ? style.active : ''}`}>{text}</p>
  </div>
);

MenuButton.defaultProps = {
  className: '',
};

export default MenuButton;
