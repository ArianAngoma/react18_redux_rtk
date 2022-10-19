import { FC, useCallback, useState } from 'react'
import UserContext, { UserContextProps } from './UserContext'

interface UserProviderProps {
  children: JSX.Element | JSX.Element[]
}

/* const name: UserContextProps = {
  name: 'Arian',
  email: 'arian.angoma.js@gmail.com'
} */

const UserProvider: FC<UserProviderProps> = ({ children }) => {

  const [user, setUser] = useState<UserContextProps | null>(null)

  const handleLogin = useCallback((user: UserContextProps) => {
    setUser(user)
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      handleLogin
    }}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider
