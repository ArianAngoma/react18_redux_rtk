import { FC } from 'react'
import UserContext from './UserContext'

interface UserProviderProps {
  children: JSX.Element | JSX.Element[]
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {

  return (
    <UserContext.Provider value={{
      hola: 'Hola mundo'
    }}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider
