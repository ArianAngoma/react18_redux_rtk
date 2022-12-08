import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'

import { LoginPage, RegisterPage, AuthRoutes } from '../auth'
import { JournalPage, JournalRoutes } from '../journal'

export const routeObject: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthRoutes/>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      },
      {
        path: 'register',
        element: <RegisterPage/>,
      },
      {
        path: '*',
        element: <Navigate to="/auth/login"/>,
      },
    ]
  },
  {
    path: '/',
    element: <JournalRoutes/>,
    children: [
      {
        index: true,
        element: <JournalPage/>,
      },
      {
        path: '*',
        element: <Navigate to="/"/>,
      }
    ]
  },
]

const rootRoutes = createBrowserRouter(routeObject)

const AppRouter = () => {

  return (
    <RouterProvider router={rootRoutes}/>
  )

}

export default AppRouter
