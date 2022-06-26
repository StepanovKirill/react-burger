import { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


// TODO:: props typing ??? 
export const ProtectedRoute: FC<{path: string}> = ({ children, path, ...props}) => {
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