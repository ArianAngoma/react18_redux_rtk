import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '../auth'
import { Navbar } from '../ui'
import { DcPage, HeroPage, MarvelPage, SearchPage } from '../heroes'

const rootRoutes = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage/>,
    index: true,
  },
  {
    path: '/',
    element: <Navbar/>,
    children: [
      {
        path: '',
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
])

const AppRouter = () => {
  return (
    <RouterProvider router={rootRoutes}/>
  )
}

export default AppRouter
