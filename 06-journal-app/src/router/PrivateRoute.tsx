import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks'

const PrivateRoute: FC = () => {

  const { status } = useAppSelector(state => state.auth)

  return (status === 'authenticated')
    ? <Outlet/>
    : <Navigate to={'/login'} replace={true}/>

}

export default PrivateRoute
