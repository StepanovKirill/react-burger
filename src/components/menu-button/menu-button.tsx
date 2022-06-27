import React, { FunctionComponent, ReactElement } from 'react';
import style from'./menu-button.module.css'

type TMenuButtonProps = { 
  className?: string;
  children: ReactElement;
  active: boolean | undefined;
  text: string;
};

const MenuButton: FunctionComponent<TMenuButtonProps> = ({className, children, active, text}) => {
  return (
    <div className={`${style.btn} ${className}`} >
        <div className={style.logo}>
          {children}
        </div>
        <p className={`text text_type_main-small ${style.text} ${active ? style.active : ''}`}>{text}</p>
    </div>
  );
}

export default MenuButton;
