import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../hooks/useAppSelector'
import { selectCurrentToken } from './authSlice'

const RequiredAuth: FC = () => {

  const token = useAppSelector(selectCurrentToken)
  const location = useLocation()

  return (
    token
      ? <Outlet/>
      : <Navigate to="/login" state={{ from: location }} replace/>
  )

}

export default RequiredAuth
