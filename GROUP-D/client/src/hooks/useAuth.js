import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Custom hook to use Authentication context
 * Must be used inside AuthProvider
 * 
 * @returns {Object} Auth context with user, token, loading, error, login, signup, logout, clearError
 * 
 * @example
 * const { user, token, loading, login } = useAuth()
 * 
 * // Login
 * const result = await login(email, password)
 * if (result.success) {
 *   // Redirect to dashboard
 * }
 * 
 * // Logout
 * const handleLogout = () => {
 *   logout()
 *   // Redirect to login
 * }
 */
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export default useAuth
