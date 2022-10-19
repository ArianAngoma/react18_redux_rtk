import { createContext } from 'react'

interface UserContext {
  [key: string]: any
}

const UserContext = createContext<UserContext | null>(null)

export default UserContext
