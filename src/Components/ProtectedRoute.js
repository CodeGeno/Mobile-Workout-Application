import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginContext } from './Contexts/LoginContext'
function ProtectedRoute({ children }) {
  const { loggedIn } = useContext(LoginContext)

  if (!loggedIn) {
    return <Navigate to='/' />
  }
  return children
}
export default ProtectedRoute
