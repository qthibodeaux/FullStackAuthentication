import useAuth from './useAuth'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function RequireAuth ({ children }) {
    const { authentication } = useAuth()
    const location = useLocation()
    
    return authentication 
      ? children
      : <Navigate to='/login' replace state={{ path: location.pathname }}/>
  }

export default RequireAuth