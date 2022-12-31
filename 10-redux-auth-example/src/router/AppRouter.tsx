import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import App from '../App'

export const routerObject: RouteObject[] = [
  {
    path: '/*',
    element: <App/>
  }
]

const rootRoutes = createBrowserRouter(routerObject)

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
