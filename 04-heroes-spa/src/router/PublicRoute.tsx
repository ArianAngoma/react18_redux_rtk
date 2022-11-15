import { FC, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../auth'

const PublicRoute: FC = () => {

  const { authState } = useContext(AuthContext) as AuthContextProps

  return (authState.isLoggedIn)
    ? <Navigate to={'/'} replace={true}/>
    : <Outlet/>

}

export default PublicRoute
