import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../hooks'

const PrivateRoute: FC = () => {

  const { user } = useAuthStore()

  return (user)
    ? <Outlet/>
    : <Navigate to={'/auth'} replace={true}/>

}

export default PrivateRoute
