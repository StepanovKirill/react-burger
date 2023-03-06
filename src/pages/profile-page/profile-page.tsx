import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import style from './profile-page.module.css';
import NavProfile from '../../components/nav-profile/nav-profile';
import ProfileInfo from '../../components/profile-info/profile-info';
import ProfileOrders from '../../components/profile-orders/profile-orders';

const ProfilePage: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <main className={style.profile_wrapper}>
      <div className={style.profile_container}>
        <NavProfile />
        <Switch>
          <Route exact path={`${path}`}>
            <ProfileInfo />
          </Route>
          <Route path={`${path}/orders`}>
            <ProfileOrders />
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default ProfilePage;
