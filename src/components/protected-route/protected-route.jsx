import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProtectedRoute({ children, ...props}) {
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

export default ProtectedRoute