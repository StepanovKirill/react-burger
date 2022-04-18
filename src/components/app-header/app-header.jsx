import {React, useState} from 'react';
import style from './app-header.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuButton from '../menu-button/menu-button.jsx';

function AppHeader() {
  const [current, setCurrent] = useState('constructor');

  return (
		<header className={style.header_container}>
				<nav className={style.header}>
					<div className={style.container}>
					<MenuButton className='mr-2' text='Конструктор' active={current === 'constructor'} onClick={() => setCurrent('constructor')}>
						<BurgerIcon type={current === 'constructor' ? 'primary' : "secondary" }/>
					</MenuButton>
					<MenuButton text='Лента заказов' active={current === 'order'} onClick={() => setCurrent('order')}>
						<ListIcon type={current === 'order' ? 'primary' : "secondary" }/>
					</MenuButton>
					</div>
					<MenuButton text='Личный кабинет' active={current === 'profile'} onClick={() => setCurrent('profile')}>
						<ProfileIcon type={current === 'profile' ? 'primary' : "secondary" }/>
					</MenuButton>
				</nav>
				<div className={style.logo}><Logo /></div>
		</header>
  );
}

export default AppHeader;