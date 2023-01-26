import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'

export const routeObject: RouteObject[] = [
  {
    path: 'auth',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <CalendarPage />
  }
]

const rootRoutes = createBrowserRouter(routeObject)

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes} />
  )
}

export default AppRouter