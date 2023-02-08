import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../hooks'

const PublicRoute: FC = () => {

  const { user } = useAuthStore()

  return (user)
    ? <Navigate to={'/'} replace={true}/>
    : <Outlet/>

}

export default PublicRoute
