import { FC, useReducer } from 'react'
import AuthContext from './AuthContext'
import authReducer, { AuthState } from './AuthReducer'

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}

const initialState: AuthState = {
  isLoggedIn: false,
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider
