import { useContext } from 'react'
import UserContext, { UserContextType } from './context/UserContext'

const HomePage = () => {
  const { user } = useContext(UserContext) as UserContextType

  return (
    <>
      <h1>Home App <small>{user?.email}</small></h1>
      <hr/>

      <pre>
        {
          (user) && JSON.stringify(user, null, 3)
        }
      </pre>
    </>
  )
}

export default HomePage
