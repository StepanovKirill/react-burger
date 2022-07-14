import React from 'react' 
import { ExtractRouteParams } from 'react-router'
import style from './nav-profile.module.css'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { logout } from '../../services/actions/user'
import { useDispatch } from '../../services/types/hooks';

type TMatchProfilePage = ExtractRouteParams<'/profile'>;

export function NavProfile() {

  // TODO: hook's typing
  const { url } = useRouteMatch()
  const isProfilePage = useRouteMatch<TMatchProfilePage>("/profile")
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  
  return (
    <nav className={style.nav_container}>
      <ul>
        <li>
          <NavLink 
            exact
            to={url}
            className={style.nav_link}
            activeClassName={style.active_nav_link}
          > 
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={`${url}/orders`} 
            className={style.nav_link}
            activeClassName={style.active_nav_link}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button className={style.button} onClick={logoutHandler}>
            Выход
          </button>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive pt-20">
        {isProfilePage?.isExact 
          ? 'В этом разделе вы можете изменить свои персональные данные'
          : 'В этом разделе вы можете просмотреть свою историю заказов'
        }
      </p>
    </nav>
  )
}