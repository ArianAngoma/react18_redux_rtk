import { FC, useCallback, useReducer } from 'react'

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

  const onLogin = useCallback((name: string = '') => {

    dispatch({
      type: '[AUTH] Login',
      payload: {
        user: name
      }
    })

  }, [])

  return (
    <AuthContext.Provider value={{
      authState,
      onLogin
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider
