import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MarvelPage from '../heroes/pages/MarvelPage'
import DcPage from '../heroes/pages/DcPage'
import LoginPage from '../auth/pages/LoginPage'

const rootRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="marvel"/>
  },
  {
    path: 'marvel',
    element: <MarvelPage/>,
  },
  {
    path: 'dc',
    element: <DcPage/>
  },
  {
    path: 'login',
    element: <LoginPage/>
  },
])

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
