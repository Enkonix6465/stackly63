import { Navigate } from 'react-router-dom'
import { isAuthenticated, isAdmin, getCurrentUser } from '../utils/auth'

export default function AdminProtectedRoute({ children }) {
  const user = getCurrentUser()
  const authenticated = isAuthenticated()
  const admin = isAdmin()
  
  console.log('🛡️ AdminProtectedRoute check:', {
    user,
    authenticated,
    admin,
    userRole: user?.role,
    userEmail: user?.email,
    localStorage: {
      authUser: localStorage.getItem('authUser'),
      users: localStorage.getItem('users')
    }
  })
  
  if (!authenticated) {
    console.log('❌ Not authenticated, redirecting to login')
    return <Navigate to="/login" replace />
  }
  
  if (!admin) {
    console.log('❌ Not admin, redirecting to home')
    return <Navigate to="/home" replace />
  }
  
  console.log('✅ Admin access granted')
  return children
}
