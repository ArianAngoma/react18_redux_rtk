import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks'

const PublicRoute: FC = () => {

  const { status } = useAppSelector(state => state.auth)

  return (status === 'authenticated')
    ? <Navigate to={'/'} replace={true}/>
    : <Outlet/>

}

export default PublicRoute
