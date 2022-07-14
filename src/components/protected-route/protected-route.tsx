import { FC } from 'react'
import { Route, Redirect, RouteProps  } from 'react-router-dom'
import { useSelector } from '../../services/types/hooks';


// TODO:: props typing ??? 
export const ProtectedRoute: FC<RouteProps> = ({ children, ...props}) => {
  const isLogged = useSelector(store => store.user.isLogged)

  return (
    <Route
      {...props}
      render={({location}) => (
        isLogged
        ? (children)
        : (<Redirect to={{ pathname: '/login', state: {from: location} }} />)
      )}
    />
  )
}