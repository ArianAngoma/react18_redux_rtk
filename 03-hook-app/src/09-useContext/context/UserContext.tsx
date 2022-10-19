import { createContext } from 'react'

export interface UserContextProps {
  name: string
  email: string
}

export interface UserContextType {
  user: UserContextProps | null
  handleLogin: (user: UserContextProps) => void
}

const UserContext = createContext<UserContextType | null>(null)

export default UserContext
