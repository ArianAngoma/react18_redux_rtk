import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import { useRenewTokenQuery } from '../store'
import { Spinner } from '../ui'

const ValidateAuth: FC = () => {

  const {
    isLoading,
  } = useRenewTokenQuery()

  if (isLoading) return <Spinner /> 
    
  return <Outlet />

}

export default ValidateAuth