import { useEffect } from 'react'

import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { Spinner } from '../ui'
import { useRenewTokenQuery } from '../store'
import { onLogout, onSetCredentials } from '../hooks'


export const routeObject: RouteObject[] = [

  {
    element: <PublicRoute />,
    children: [
      {
        path: 'auth',
        element: <LoginPage />
      }
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '*',
        element: <CalendarPage />
      }
    ]
  }

]

const rootRoutes = createBrowserRouter(routeObject)

const AppRouter = () => {

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

  return (
    <RouterProvider router={rootRoutes} />
  )
}

export default AppRouter