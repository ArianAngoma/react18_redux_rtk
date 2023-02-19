import { FC, useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import { useRenewTokenQuery } from '../store'
import { Spinner } from '../ui'
import { onLogout, onSetCredentials } from '../hooks'

const ValidateAuth: FC = () => {

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useRenewTokenQuery()

  useEffect(() => {

    if (isSuccess) {

      onSetCredentials({
        user: {
          uid: data?.uid,
          name: data?.name,
        },
        token: data?.token,
      })

    }

  }, [isSuccess])

  useEffect(() => {

    if (isError) onLogout()

  }, [isError])

  if (isLoading) return <Spinner />

  return <Outlet />

}

export default ValidateAuth