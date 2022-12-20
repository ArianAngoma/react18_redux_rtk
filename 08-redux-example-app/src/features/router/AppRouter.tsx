import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import App from '../../App'
import Layout from '../../components/Layout'

export const routerObject: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <App/>
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
