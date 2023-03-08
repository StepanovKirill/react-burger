import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './app-header.module.css';
import MenuButton from '../menu-button/menu-button';
import { useSelector } from '../../services/types/hooks';

function AppHeader(): JSX.Element {
  const isMainPage = useRouteMatch('/')?.isExact;
  const isFeedPage = useRouteMatch('/order-feed')?.isExact;
  const isProfilePage = useRouteMatch('/profile')?.isExact;

  const userName = useSelector((store) => store.user?.user?.name);
  const profile = userName || 'Личный кабинет';

  return (
    <header className={style.header_container}>
      <nav className={style.header}>
        <div className={style.container}>
          <Link to="/" className={style.link}>
            <MenuButton className="mr-2" text="Конструктор" active={isMainPage}>
              <BurgerIcon type={isMainPage ? 'primary' : 'secondary'} />
            </MenuButton>
          </Link>
          <Link to="/order-feed" className={style.link}>
            <MenuButton text="Лента заказов" active={isFeedPage}>
              <ListIcon type={isFeedPage ? 'primary' : 'secondary'} />
            </MenuButton>
          </Link>
        </div>
        <Link to="/profile" className={style.link}>
          <MenuButton text={profile} active={isProfilePage}>
            <ProfileIcon type={isProfilePage ? 'primary' : 'secondary'} />
          </MenuButton>
        </Link>
      </nav>
      <Link to="/" className={style.logo}>
        <Logo />
      </Link>
    </header>
  );
}

export default AppHeader;
