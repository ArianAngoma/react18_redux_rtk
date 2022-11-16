import { FC, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../context'

const LoginPage: FC = () => {

  const { onLogin: onLoginContext } = useContext(AuthContext) as AuthContextProps

  const navigation = useNavigate()
  const { state } = useLocation()

  const onLogin = () => {

    onLoginContext('Arian Angoma')

    navigation(state?.from || '/', { replace: true })

  }

  return (

    <div className="container mt-5">

      <h1>Login</h1>
      <hr/>

      <button
        className="btn btn-primary"
        onClick={onLogin}
      >
        Login
      </button>

    </div>

  )
}

export default LoginPage
