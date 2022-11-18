import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '../auth'
import { DcPage, HeroPage, HeroesRouter, MarvelPage, SearchPage } from '../heroes'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const rootRoutes = createBrowserRouter([
  {
    element: <PublicRoute/>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      }
    ]
  },
  {
    element: <PrivateRoute/>,
    children: [
      {
        path: '/',
        element: <HeroesRouter/>,
        children: [
          {
            index: true,
            element: <Navigate to="/marvel"/>,
          },
          {
            path: 'marvel',
            element: <MarvelPage/>
          },
          {
            path: 'dc',
            element: <DcPage/>
          },
          {
            path: 'search',
            element: <SearchPage/>
          },
          {
            path: 'hero/:heroId',
            element: <HeroPage/>
          }
        ]
      }
    ]
  }
])

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
