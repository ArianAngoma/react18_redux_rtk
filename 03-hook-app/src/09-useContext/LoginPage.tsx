import { useContext } from 'react'
import UserContext, { UserContextType } from './context/UserContext'

const LoginPage = () => {

  const {
    user,
    handleLogin
  } = useContext(UserContext) as UserContextType

  return (
    <>
      <h1>Login App</h1>
      <hr/>

      <pre>
        {
          (user) && JSON.stringify(user, null, 3)
        }
      </pre>

      <button
        className={'btn btn-primary'}
        onClick={() => handleLogin({
          name: 'Arian Angoma',
          email: 'arian.angoma.js@gmail.com'
        })}
      >
        Establish user
      </button>
    </>
  )
}

export default LoginPage
