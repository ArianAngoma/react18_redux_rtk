import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { MarvelPage, DcPage } from '../heroes'
import { LoginPage } from '../auth'
import { MainApp } from '../ui'

const rootRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainApp/>,
    children: [
      {
        path: '/',
        element: <Navigate to="marvel"/>,
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
    ]
  },
])

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
