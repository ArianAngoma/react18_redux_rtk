import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import App from '../App'
import Public from '../components/Public'
import Login from '../features/auth/Login'
import RequiredAuth from '../features/auth/RequiredAuth'
import Welcome from '../features/auth/Welcome'

export const routerObject: RouteObject[] = [
  {
    element: <App/>,
    children: [
      {
        index: true,
        element: <Public/>,
      },
      {
        path: 'login',
        element: <Login/>,
      }
    ]
  },
  {
    element: <RequiredAuth/>,
    children: [
      {
        path: 'welcome',
        element: <Welcome/>,
      }
    ]
  }
]

const rootRoutes = createBrowserRouter(routerObject)

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
