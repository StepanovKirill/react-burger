import {React, useState} from 'react';
import style from './app-header.module.css'
import {Link, useRouteMatch} from 'react-router-dom'
import {Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuButton from '../menu-button/menu-button.jsx';

function AppHeader() {

  const isMainPage = useRouteMatch("/");
  const isFeedPage = useRouteMatch("/order-feed");
  const isProfilePage = useRouteMatch("/profile");

  return (
    <header className={style.header_container}>
        <nav className={style.header}>
          <div className={style.container}>
          <Link to='/' exact className={style.link}>
            <MenuButton className='mr-2' text='Конструктор' active={isMainPage.isExact}>
              <BurgerIcon type={isMainPage.isExact ? 'primary' : "secondary" }/>
            </MenuButton>
          </Link>
          <Link to='/order-feed' className={style.link}>
            <MenuButton text='Лента заказов' active={isFeedPage}>
              <ListIcon type={isFeedPage ? 'primary' : "secondary" }/>
            </MenuButton>
          </Link>
          </div>
          <Link to='/profile' className={style.link}>
          <MenuButton text='Личный кабинет' active={isProfilePage}>
            <ProfileIcon type={isProfilePage ? 'primary' : "secondary" }/>
          </MenuButton>
          </Link>
        </nav>
        <Link to='/' exact className={style.logo}>
          <Logo />
        </Link>
    </header>
  );
}

export default AppHeader;