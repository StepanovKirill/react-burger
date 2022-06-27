import { FC } from 'react'
import { Route, Redirect, RouteProps  } from 'react-router-dom'
import { useSelector } from 'react-redux'


// TODO:: props typing ??? 
export const ProtectedRoute: FC<RouteProps> = ({ children, ...props}) => {
  const isLogged = useSelector<any, any>(store => store.user.isLogged)

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