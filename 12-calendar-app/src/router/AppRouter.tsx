import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import ValidateAuth from './ValidateAuth'

export const routeObject: RouteObject[] = [
  {
    element: <ValidateAuth />,
    children: [
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
  }
]

const rootRoutes = createBrowserRouter(routeObject)

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes} />
  )
}

export default AppRouter