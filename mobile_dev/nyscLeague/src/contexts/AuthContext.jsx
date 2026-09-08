import { createContext, useContext } from 'react'
import { useAuthState } from '../utilities/firebase.jsx'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState()

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}