import { FC, useCallback, useReducer } from 'react'

import AuthContext from './AuthContext'
import authReducer, { AuthState } from './AuthReducer'

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}

/* const initialState: AuthState = {
  isLoggedIn: false,
} */

const init = (): AuthState => {

  const user = JSON.parse(localStorage.getItem('user')!)

  return {
    isLoggedIn: Boolean(user),
    user
  }

}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, null, init)

  const onLogin = useCallback((name: string) => {

    dispatch({
      type: '[AUTH] Login',
      payload: {
        user: name
      }
    })

    localStorage.setItem('user', JSON.stringify(name))

  }, [])

  const onLogout = useCallback(() => {

    dispatch({
      type: '[AUTH] Logout'
    })

    localStorage.removeItem('user')


  }, [])

  return (
    <AuthContext.Provider value={{
      authState,
      onLogin,
      onLogout
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider
