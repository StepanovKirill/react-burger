import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const isLogged = useSelector((store) => store.user.isLogged);

  const render = React.useCallback(
    ({ location }) =>
      isLogged ? (
        children
      ) : (
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ),
    [children, isLogged],
  );

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={render}
    />
  );
};

export default ProtectedRoute;
