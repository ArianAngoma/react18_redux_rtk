import { FC, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../auth'

const PrivateRoute: FC = () => {

  const { authState } = useContext(AuthContext) as AuthContextProps

  return (authState.isLoggedIn)
    ? <Outlet/>
    : <Navigate to={'/login'} replace={true}/>

}

export default PrivateRoute
