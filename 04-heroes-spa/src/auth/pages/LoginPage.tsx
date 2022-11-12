import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage: FC = () => {

  const navigation = useNavigate()

  const onLogin = () => navigation('/', { replace: true })

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
