import { createContext } from 'react'

import { AuthState } from './AuthReducer'

export interface AuthContextProps {
  authState: AuthState
  onLogin: (name: string) => void
  onLogout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

export default AuthContext
